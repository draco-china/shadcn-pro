'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Popover as PopoverPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'
import { FieldCalendar } from '../shared/calendar'
import { FieldClearButton, FieldPopoverContent, fieldTriggerClassName } from '../shared/field'

export function DatePicker({
  value,
  onChange,
  disabled,
  placeholder = 'Pick a date',
  className,
}: {
  value?: Date
  onChange?: (date: Date | undefined) => void
  disabled?: boolean
  placeholder?: string
  className?: string
}) {
  return (
    <PopoverPrimitive.Root data-slot="field-popover">
      <div className={cn('relative w-full', className)}>
        <PopoverPrimitive.Trigger data-slot="field-popover-trigger" asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              fieldTriggerClassName,
              !value && 'text-muted-foreground',
              value && !disabled && 'pr-8',
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            <span className="min-w-0 flex-1 truncate text-left">
              {value ? format(value, 'PPP') : placeholder}
            </span>
          </button>
        </PopoverPrimitive.Trigger>
        {value && !disabled && (
          <FieldClearButton
            label="Clear date"
            onClear={() => onChange?.(undefined)}
            className="absolute top-1/2 right-2 z-10 ml-0 -translate-y-1/2"
          />
        )}
      </div>
      <FieldPopoverContent className="w-auto p-0" align="start">
        <FieldCalendar mode="single" selected={value} onSelect={onChange} />
      </FieldPopoverContent>
    </PopoverPrimitive.Root>
  )
}

export function DateRangePicker({
  value,
  onChange,
  disabled,
  placeholder = 'Pick date range',
  className,
}: {
  value?: { from?: Date; to?: Date }
  onChange?: (value: { from?: Date; to?: Date } | undefined) => void
  disabled?: boolean
  placeholder?: string
  className?: string
}) {
  const from = value?.from
  const to = value?.to

  return (
    <PopoverPrimitive.Root data-slot="field-popover">
      <div className={cn('relative w-full', className)}>
        <PopoverPrimitive.Trigger data-slot="field-popover-trigger" asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              fieldTriggerClassName,
              !from && 'text-muted-foreground',
              from && !disabled && 'pr-8',
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            <span className="min-w-0 flex-1 truncate text-left">
              {from && to
                ? `${format(from, 'LLL dd, y')} - ${format(to, 'LLL dd, y')}`
                : from
                  ? format(from, 'LLL dd, y')
                  : placeholder}
            </span>
          </button>
        </PopoverPrimitive.Trigger>
        {from && !disabled && (
          <FieldClearButton
            label="Clear date range"
            onClear={() => onChange?.(undefined)}
            className="absolute top-1/2 right-2 z-10 ml-0 -translate-y-1/2"
          />
        )}
      </div>
      <FieldPopoverContent className="w-auto p-0" align="start">
        <FieldCalendar
          mode="range"
          selected={{ from, to }}
          onSelect={(range) => {
            if (!range) {
              onChange?.(undefined)
              return
            }
            onChange?.({ from: range.from, to: range.to })
          }}
          numberOfMonths={2}
        />
      </FieldPopoverContent>
    </PopoverPrimitive.Root>
  )
}
