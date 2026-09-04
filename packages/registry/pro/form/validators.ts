import type { StandardSchemaV1 } from '@tanstack/react-form'

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
