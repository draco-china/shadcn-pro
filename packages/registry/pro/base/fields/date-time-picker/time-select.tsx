import { TimePartSelect } from '../time-picker/time-part-select'
import { timeOptions } from '../time-picker/utils'
import {
  dateTimePickerTimeSelectClassName,
  dateTimePickerTimeSelectTriggerClassName,
} from './classes'
import type { TimeSelectProps } from './types'

export function TimeSelect({ hour, minute, second, disabled, onChange }: TimeSelectProps) {
  return (
    <div className={dateTimePickerTimeSelectClassName}>
      <TimePartSelect
        value={hour}
        disabled={disabled}
        options={timeOptions.hour}
        triggerClassName={dateTimePickerTimeSelectTriggerClassName}
        onChange={(nextHour) => onChange(nextHour, minute, second)}
      />
      <span>:</span>
      <TimePartSelect
        value={minute}
        disabled={disabled}
        options={timeOptions.minute}
        triggerClassName={dateTimePickerTimeSelectTriggerClassName}
        onChange={(nextMinute) => onChange(hour, nextMinute, second)}
      />
      <span>:</span>
      <TimePartSelect
        value={second}
        disabled={disabled}
        options={timeOptions.second}
        triggerClassName={dateTimePickerTimeSelectTriggerClassName}
        onChange={(nextSecond) => onChange(hour, minute, nextSecond)}
      />
    </div>
  )
}
