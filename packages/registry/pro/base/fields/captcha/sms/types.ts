import type { ChangeEvent } from 'react'
import type { InputProps } from '../../input'

export interface CaptchaProps extends Omit<InputProps, 'value' | 'onChange' | 'disabled'> {
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onSend?: () => void | Promise<void>
  buttonText?: string
  /** Countdown duration in milliseconds. */
  countdown?: number
  disabled?: boolean
  buttonClassName?: string
}
