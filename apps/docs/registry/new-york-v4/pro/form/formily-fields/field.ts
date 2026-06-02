import type { ReactNode } from 'react'

export interface FormilyFieldView<T = unknown> {
  value?: T
  placeholder?: string
  dataSource?: T[]
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  path?: { toString: () => string }
  title?: string
  selfErrors?: string[]
  description?: ReactNode
}

export function fieldView<T = unknown>(field: unknown): FormilyFieldView<T> {
  return field as FormilyFieldView<T>
}

export function fieldValue<T>(field: unknown): T | undefined {
  return fieldView<T>(field).value
}

export function fieldValueOrProp<T>({ value }: { value?: T }, field: unknown): T | undefined {
  return value ?? fieldValue<T>(field)
}

export function fieldPlaceholder(field: unknown): string | undefined {
  return fieldView(field).placeholder
}

export function fieldPlaceholderOrProp(
  { placeholder }: { placeholder?: string },
  field: unknown,
  fallback?: string,
): string | undefined {
  return placeholder ?? fieldPlaceholder(field) ?? fallback
}

export function fieldDataSource<T>(field: unknown): T[] | undefined {
  return fieldView<T>(field).dataSource
}

export function fieldOptionsOrProp<T>(
  { options }: { options?: T[] },
  field: unknown,
): T[] | undefined {
  return options ?? fieldDataSource<T>(field)
}

export function fieldRequiredOrProp(
  { required: propRequired }: { required?: boolean },
  field: unknown,
) {
  const { required } = fieldView(field)
  return required ?? propRequired
}

export function fieldDisabled(field: unknown) {
  return fieldView(field).disabled
}

export function fieldDisabledOrProp({ disabled }: { disabled?: boolean }, field: unknown) {
  return fieldDisabled(field) ?? disabled
}

export function fieldControlProps(
  props: { disabled?: boolean; readOnly?: boolean },
  field: unknown,
) {
  const { readOnly } = props
  return {
    disabled: fieldDisabledOrProp(props, field),
    readOnly: fieldView(field).readOnly ?? readOnly,
  }
}

export function fieldId(field: unknown) {
  return fieldView(field).path?.toString()
}

export function fieldBaseProps(
  props: { disabled?: boolean; readOnly?: boolean; placeholder?: string },
  field: unknown,
  fallback?: string,
) {
  const view = fieldView(field)

  return {
    disabled: fieldDisabledOrProp(props, field),
    readOnly: view.readOnly ?? props.readOnly,
    id: view.path?.toString(),
    placeholder: fieldPlaceholderOrProp(props, field, fallback),
  }
}
