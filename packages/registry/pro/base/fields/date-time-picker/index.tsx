'use client'

import { FieldPopover } from '../shared/popover'
import { DateTimePickerContent } from './content'
import { DateTimePickerTrigger } from './trigger'
import type { DateTimePickerProps } from './types'

export type { DateTimePickerProps, TimeSelectProps } from './types'

export function DateTimePicker({
  value,
  onChange,
  disabled,
  placeholder = 'Pick date & time',
  allowClear = true,
  size = 'default',
  className,
}: DateTimePickerProps) {
  const hour = value ? value.getHours() : 0
  const minute = value ? value.getMinutes() : 0
  const second = value ? value.getSeconds() : 0
  const hasValue = value !== undefined
  const showClear = allowClear && hasValue && !disabled

  function handleDaySelect(day: Date | undefined) {
    if (!day) {
      onChange?.(undefined)
      return
    }
    const d = new Date(day)
    d.setHours(hour, minute, second)
    onChange?.(d)
  }

  function handleTimeChange(h: number, m: number, s: number) {
    if (!value) return
    const d = new Date(value)
    d.setHours(h, m, s)
    onChange?.(d)
  }

  function handleClear() {
    onChange?.(undefined)
  }

  return (
    <FieldPopover>
      <DateTimePickerTrigger
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        size={size}
        className={className}
        showClear={showClear}
        onClear={handleClear}
      />
      <DateTimePickerContent
        value={value}
        disabled={disabled}
        hour={hour}
        minute={minute}
        second={second}
        onDaySelect={handleDaySelect}
        onTimeChange={handleTimeChange}
      />
    </FieldPopover>
  )
}
