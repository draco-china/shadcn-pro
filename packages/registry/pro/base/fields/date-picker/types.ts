import type { FieldSize } from '../shared/field'

export interface DatePickerBaseProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  disabled?: boolean
  placeholder?: string
  dateFormat?: string
  allowClear?: boolean
  size?: FieldSize
  className?: string
}
