import { FieldCalendar } from '../shared/calendar'
import { FieldPopoverContent } from '../shared/popover'
import { dateTimePickerContentClassName } from './classes'
import { TimeSelect } from './time-select'

export function DateTimePickerContent({
  value,
  disabled,
  hour,
  minute,
  second,
  onDaySelect,
  onTimeChange,
}: {
  value?: Date
  disabled?: boolean
  hour: number
  minute: number
  second: number
  onDaySelect: (day: Date | undefined) => void
  onTimeChange: (hour: number, minute: number, second: number) => void
}) {
  return (
    <FieldPopoverContent className={dateTimePickerContentClassName} align="start">
      <FieldCalendar mode="single" selected={value} onSelect={onDaySelect} />
      <TimeSelect
        hour={hour}
        minute={minute}
        second={second}
        disabled={!value || disabled}
        onChange={onTimeChange}
      />
    </FieldPopoverContent>
  )
}
