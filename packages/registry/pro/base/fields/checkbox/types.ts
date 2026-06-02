import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface CheckboxBaseProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'value' | 'defaultValue' | 'onChange' | 'checked' | 'defaultChecked' | 'onCheckedChange'
  > {
  value?: boolean | string[]
  defaultValue?: boolean | string[]
  onChange?: (checked: boolean | string[]) => void
  options?: CheckboxOption[]
  children?: ReactNode
  labelClassName?: string
  itemClassName?: string
}

export interface CheckboxOption {
  label: ReactNode
  value: string
  description?: ReactNode
  disabled?: boolean
}

export interface CheckboxControlProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'checked' | 'defaultChecked' | 'onChange' | 'onCheckedChange' | 'value'
  > {
  checked?: boolean | 'indeterminate'
  defaultChecked?: boolean | 'indeterminate'
  onCheckedChange?: (checked: boolean | 'indeterminate') => void
}
