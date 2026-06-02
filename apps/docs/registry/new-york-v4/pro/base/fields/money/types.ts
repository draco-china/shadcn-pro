import type { InputProps } from '../input'

export interface MoneyProps extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange'> {
  value?: number
  onChange?: (value: number | undefined) => void
  currency?: string
  precision?: number
}
