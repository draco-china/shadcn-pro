import type { ButtonHTMLAttributes } from 'react'

export interface SwitchProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'checked' | 'onCheckedChange' | 'onChange' | 'value'
  > {
  value?: boolean
  onChange?: (checked: boolean) => void
  size?: 'sm' | 'default'
}
