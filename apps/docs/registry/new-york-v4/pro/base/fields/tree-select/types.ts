import type { FieldSize } from '../shared/field'

export interface TreeSelectOption {
  label: string
  value: string
  disabled?: boolean
  children?: TreeSelectOption[]
}

export interface TreeSelectProps {
  value?: string[]
  onChange?: (value: string[]) => void
  options?: TreeSelectOption[]
  placeholder?: string
  disabled?: boolean
  required?: boolean
  allowClear?: boolean
  size?: FieldSize
  multiple?: boolean
  className?: string
}
