export interface DigitRangeValue {
  min?: number
  max?: number
}

export interface DigitRangeProps {
  value?: DigitRangeValue
  onChange?: (value: DigitRangeValue | undefined) => void
  placeholder?: [string, string]
  disabled?: boolean
  className?: string
  allowClear?: boolean
}
