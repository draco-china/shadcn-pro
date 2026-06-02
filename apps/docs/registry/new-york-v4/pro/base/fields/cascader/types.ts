import type { FieldSize } from '../shared/field'

export interface CascaderOption {
  label: string
  value: string
  disabled?: boolean
  children?: CascaderOption[]
}

export interface CascaderProps {
  value?: string[]
  onChange?: (value: string[]) => void
  options?: CascaderOption[]
  placeholder?: string
  disabled?: boolean
  required?: boolean
  allowClear?: boolean
  size?: FieldSize
  className?: string
}
