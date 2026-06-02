'use client'

import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FieldCalendar } from '../shared/calendar'
import { formatDate } from '../shared/date'
import {
  fieldAutoPopoverContentClassName,
  fieldRelativeRootClassName,
  fieldTriggerIconClassName,
  fieldTriggerLabelClassName,
} from '../shared/field'
import { FieldPopover, FieldPopoverContent, FieldPopoverTriggerRoot } from '../shared/popover'
import { FieldPopoverClear, FieldPopoverTrigger } from '../shared/trigger'
import type { DatePickerBaseProps } from './types'

export type { DatePickerBaseProps } from './types'

export function DatePicker({
  value,
  onChange,
  disabled,
  placeholder = 'Pick a date',
  dateFormat = 'PPP',
  allowClear = true,
  size = 'default',
  className,
}: DatePickerBaseProps) {
  const hasValue = value !== undefined
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
            <span className={fieldTriggerLabelClassName}>
              {value ? formatDate(value, dateFormat) : placeholder}
            </span>
          </FieldPopoverTrigger>
        </FieldPopoverTriggerRoot>
        <FieldPopoverClear showClear={showClear} label="Clear date" onClear={handleClear} />
      </div>
      <FieldPopoverContent className={fieldAutoPopoverContentClassName} align="start">
        <FieldCalendar mode="single" selected={value} onSelect={onChange} />
      </FieldPopoverContent>
    </FieldPopover>
  )
}
