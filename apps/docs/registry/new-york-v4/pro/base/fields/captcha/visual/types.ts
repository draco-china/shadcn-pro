import type { ChangeEvent } from 'react'
import type { InputProps } from '../../input'

export interface VisualCaptchaProps extends Omit<InputProps, 'value' | 'onChange' | 'disabled'> {
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onRefresh?: () => void | Promise<void>
  captchaUrl?: string
  captchaText?: string
  disabled?: boolean
}
