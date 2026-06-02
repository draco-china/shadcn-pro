import type { FieldSize } from '../shared/field'

export interface TimeSelectProps {
  hour: number
  minute: number
  second: number
  disabled?: boolean
  onChange: (hour: number, minute: number, second: number) => void
}

export interface DateTimePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  disabled?: boolean
  placeholder?: string
  allowClear?: boolean
  size?: FieldSize
  className?: string
}
