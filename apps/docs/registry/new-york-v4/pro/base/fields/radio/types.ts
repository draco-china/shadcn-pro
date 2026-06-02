import type { ReactNode } from 'react'

export interface RadioOption {
  label: ReactNode
  value: string
  description?: ReactNode
  disabled?: boolean
}

export interface RadioProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  options?: RadioOption[]
  className?: string
  required?: boolean
  name?: string
  itemClassName?: string
  labelClassName?: string
}

export interface RadioItemProps {
  option: RadioOption
  id: string
  disabled?: boolean
  itemClassName?: string
  labelClassName?: string
}
