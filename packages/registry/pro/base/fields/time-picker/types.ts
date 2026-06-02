export interface TimePickerProps {
  value?: string
  onChange?: (value: string | undefined) => void
  disabled?: boolean
  className?: string
  allowClear?: boolean
}

export interface TimePartSelectProps {
  value: number
  options: number[]
  disabled?: boolean
  triggerClassName?: string
  onChange: (value: number) => void
}
