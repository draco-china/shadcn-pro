'use client'

import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FieldCalendar } from '../shared/calendar'
import { formatDateRange } from '../shared/date'
import {
  fieldAutoPopoverContentClassName,
  fieldRelativeRootClassName,
  fieldTriggerIconClassName,
  fieldTriggerLabelClassName,
} from '../shared/field'
import { FieldPopover, FieldPopoverContent, FieldPopoverTriggerRoot } from '../shared/popover'
import { FieldPopoverClear, FieldPopoverTrigger } from '../shared/trigger'
import type { DateRangePickerProps } from './types'

export type { DateRangePickerProps, DateRangeValue } from './types'

export function DateRangePicker({
  value,
  onChange,
  disabled,
  placeholder = 'Pick date range',
  allowClear = true,
  size = 'default',
  className,
}: DateRangePickerProps) {
  const label = formatDateRange(value?.from, value?.to)
  const hasValue = value?.from !== undefined
  const showClear = allowClear && hasValue && !disabled

  function handleClear() {
    onChange?.(undefined)
  }

  return (
    <FieldPopover>
      <div className={cn(fieldRelativeRootClassName, className)}>
        <FieldPopoverTriggerRoot asChild>
          <FieldPopoverTrigger
            size={size}
            disabled={disabled}
            hasValue={hasValue}
            showClear={showClear}
          >
            <CalendarIcon className={fieldTriggerIconClassName} />
            <span className={fieldTriggerLabelClassName}>{label ?? placeholder}</span>
          </FieldPopoverTrigger>
        </FieldPopoverTriggerRoot>
        <FieldPopoverClear showClear={showClear} label="Clear date range" onClear={handleClear} />
      </div>
      <FieldPopoverContent className={fieldAutoPopoverContentClassName} align="start">
        <FieldCalendar
          mode="range"
          selected={{ from: value?.from, to: value?.to }}
          onSelect={(range) => onChange?.(range ? { from: range.from, to: range.to } : undefined)}
          numberOfMonths={2}
        />
      </FieldPopoverContent>
    </FieldPopover>
  )
}
