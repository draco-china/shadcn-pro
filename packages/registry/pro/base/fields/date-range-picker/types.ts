import type { FieldSize } from '../shared/field'

export interface DateRangeValue {
  from?: Date
  to?: Date
}

export interface DateRangePickerProps {
  value?: DateRangeValue
  onChange?: (value: DateRangeValue | undefined) => void
  disabled?: boolean
  placeholder?: string
  allowClear?: boolean
  size?: FieldSize
  className?: string
}
