import type {
  FormValidateOrFn,
  StandardSchemaV1,
  StandardSchemaV1Issue,
} from '@tanstack/react-form'

type ProFieldValidator<TValue = unknown> =
  | ((props: { value: TValue }) => unknown)
  | StandardSchemaV1<TValue, unknown>

/** Validators supported by a ProForm field at each validation phase. */
export interface ProFieldValidators<TValue = unknown> {
  onChange?: ProFieldValidator<TValue>
  onBlur?: ProFieldValidator<TValue>
  onSubmit?: ProFieldValidator<TValue>
}

/** Composes required validation with an existing field validator. */
export function withRequiredValidator<TValue>(
  required?: boolean,
  validators?: ProFieldValidators<TValue>,
) {
  if (!required) return validators
  const validator = validators?.onSubmit
  return {
    ...validators,
    onSubmit: combineRequiredValidator(validator),
  }
}

/** Adds registered required fields to a form validator without replacing its own errors. */
export function withRequiredFormValidator<TValues extends Record<string, unknown>>(
  validator: FormValidateOrFn<TValues>,
  getRequiredFields: () => Iterable<string>,
): FormValidateOrFn<TValues> {
  if (isStandardSchema(validator)) {
    const standard = validator['~standard']
    return {
      '~standard': {
        ...standard,
        validate: (value: unknown) => {
          const result = standard.validate(value)
          if (result instanceof Promise) {
            return result.then((resolved) =>
              mergeStandardSchemaRequiredErrors(resolved, value, getRequiredFields()),
            )
          }
          return mergeStandardSchemaRequiredErrors(result, value, getRequiredFields())
        },
      },
    } satisfies StandardSchemaV1<TValues, unknown>
  }

  return (props) => {
    const result = validator(props)
    const fields = getRequiredFieldErrors(props.value, getRequiredFields())
    if (Object.keys(fields).length === 0) return result
    if (isGlobalFormError(result)) {
      return { ...result, fields: { ...fields, ...getDefinedErrors(result.fields) } }
    }
    return { form: result, fields }
  }
}

function combineRequiredValidator<TValue>(validator?: ProFieldValidator<TValue>) {
  if (!validator) return validateRequired
  if (typeof validator === 'function') {
    return (props: { value: TValue }) => validateRequired(props) ?? validator(props)
  }

  const standard = validator['~standard']
  return {
    '~standard': {
      ...standard,
      validate: async (value: unknown) => {
        const error = validateRequired({ value })
        if (error) return { issues: [{ message: error }] }
        return standard.validate(value as TValue)
      },
    },
  } satisfies StandardSchemaV1<TValue, unknown>
}

/** Returns the default required-field error for empty values. */
export function validateRequired({ value }: { value: unknown }) {
  if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) {
    return 'This field is required.'
  }
  return undefined
}

function mergeStandardSchemaRequiredErrors(
  result: { value: unknown; issues?: undefined } | { issues: readonly StandardSchemaV1Issue[] },
  value: unknown,
  requiredFields: Iterable<string>,
) {
  const issues = 'issues' in result && result.issues ? [...result.issues] : []
  const issueFields = new Set(issues.map(getIssueField).filter(Boolean))

  for (const [name, message] of Object.entries(getRequiredFieldErrors(value, requiredFields))) {
    if (!issueFields.has(name)) issues.push({ message, path: name.split('.') })
  }

  return issues.length > 0 ? { issues } : result
}

function getRequiredFieldErrors(value: unknown, requiredFields: Iterable<string>) {
  const errors: Record<string, string> = {}
  for (const name of requiredFields) {
    const error = validateRequired({ value: getValueAtPath(value, name) })
    if (error) errors[name] = error
  }
  return errors
}

function getValueAtPath(value: unknown, path: string) {
  return (path.match(/[^.[\]]+/g) ?? []).reduce<unknown>((current, key) => {
    if (current == null || typeof current !== 'object') return undefined
    return (current as Record<string, unknown>)[key]
  }, value)
}

function getIssueField(issue: StandardSchemaV1Issue) {
  return issue.path
    ?.map((segment) =>
      typeof segment === 'object' && segment !== null && 'key' in segment
        ? String(segment.key)
        : String(segment),
    )
    .join('.')
}

function isStandardSchema<TValues extends Record<string, unknown>>(
  validator: FormValidateOrFn<TValues>,
): validator is StandardSchemaV1<TValues, unknown> {
  return typeof validator === 'object' && validator !== null && '~standard' in validator
}

function isGlobalFormError(
  value: unknown,
): value is { form?: unknown; fields: Record<string, unknown> } {
  return typeof value === 'object' && value !== null && 'fields' in value
}

function getDefinedErrors(fields: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(fields).filter(([, error]) => error !== undefined))
}

/** Normalizes TanStack and Standard Schema errors for rendering. */
export function getErrorMessages(errors: unknown[]) {
  return errors.map((error) => {
    if (typeof error === 'string') return error
    if (error && typeof error === 'object' && 'message' in error) return String(error.message)
    return String(error)
  })
}

/** Extracts a value from native change events or returns direct field values. */
export function getControlValue(value: unknown) {
  if (value && typeof value === 'object' && 'target' in value) {
    const target = (
      value as {
        target: { type?: string; value: unknown; checked?: boolean }
      }
    ).target
    return target.type === 'checkbox' ? target.checked : target.value
  }
  return value
}
