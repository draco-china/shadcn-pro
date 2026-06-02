'use client'

import { cn } from '@/lib/utils'
import { FieldClearButton, fieldClearButtonClassName, fieldShellClassName } from '../shared/field'
import {
  timePickerRootClassName,
  timePickerRootClearableClassName,
  timePickerSeparatorClassName,
} from './classes'
import { TimePartSelect } from './time-part-select'
import type { TimePickerProps } from './types'
import { formatTimeValue, parseTimeValue, timeOptions } from './utils'

export type { TimePickerProps } from './types'

export function TimePicker({
  value,
  onChange,
  disabled,
  className,
  allowClear = true,
}: TimePickerProps) {
  const { hour, minute, second } = parseTimeValue(value)
  const hasValue = value !== undefined && value.length > 0
  const showClear = allowClear && hasValue && !disabled

  function emit(nextHour: number, nextMinute: number, nextSecond: number) {
    onChange?.(formatTimeValue(nextHour, nextMinute, nextSecond))
  }

  function handleClear() {
    onChange?.(undefined)
  }

  return (
    <div
      className={cn(
        fieldShellClassName,
        timePickerRootClassName,
        showClear && timePickerRootClearableClassName,
        className,
      )}
    >
      <TimePartSelect
        value={hour}
        disabled={disabled}
        options={timeOptions.hour}
        onChange={(nextHour) => emit(nextHour, minute, second)}
      />
      <span className={timePickerSeparatorClassName}>:</span>
      <TimePartSelect
        value={minute}
        disabled={disabled}
        options={timeOptions.minute}
        onChange={(nextMinute) => emit(hour, nextMinute, second)}
      />
      <span className={timePickerSeparatorClassName}>:</span>
      <TimePartSelect
        value={second}
        disabled={disabled}
        options={timeOptions.second}
        onChange={(nextSecond) => emit(hour, minute, nextSecond)}
      />
      {showClear && (
        <FieldClearButton
          label="Clear time"
          onClear={handleClear}
          className={fieldClearButtonClassName}
        />
      )}
    </div>
  )
}
