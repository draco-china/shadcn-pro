import type { InputProps } from '../input'

export interface DigitProps extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange'> {
  value?: number
  onChange?: (value: number | undefined) => void
}
