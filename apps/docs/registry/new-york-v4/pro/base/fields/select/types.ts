import type { ReactNode } from 'react'
import type { FieldSize } from '../shared/field'

export interface SelectOption {
  label: ReactNode
  value: string
  description?: ReactNode
  disabled?: boolean
}

export interface SelectProps {
  value?: string | string[]
  defaultValue?: string | string[]
  onChange?: (value: string | string[] | undefined) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  options?: SelectOption[]
  allowClear?: boolean
  multiple?: boolean
  searchable?: boolean
  searchPlaceholder?: string
  emptyText?: ReactNode
  maxTagCount?: number
  size?: FieldSize
  className?: string
  triggerClassName?: string
  contentClassName?: string
}
