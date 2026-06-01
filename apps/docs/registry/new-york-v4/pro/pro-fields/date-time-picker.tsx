'use client'

import { format } from 'date-fns'
import { CalendarIcon, X } from 'lucide-react'
import type * as React from 'react'
import { Button } from '@/registry/new-york-v4/ui/button'
import { Calendar } from '@/registry/new-york-v4/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/new-york-v4/ui/popover'
import { cn } from '@/lib/utils'

export interface TimeSelectProps {
  hour: number
  minute: number
  second: number
  disabled?: boolean
  onChange: (h: number, m: number, s: number) => void
}

function TimeSelect({ hour, minute, second, disabled, onChange }: TimeSelectProps) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    <div className="flex items-center gap-1 border-t p-3">
      <select
        value={hour}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value), minute, second)}
        className="rounded border px-1 py-0.5 text-sm"
      >
        {Array.from({ length: 24 }, (_, i) => (
          <option key={pad(i)} value={i}>
            {pad(i)}
          </option>
        ))}
      </select>
      <span>:</span>
      <select
        value={minute}
        disabled={disabled}
        onChange={(e) => onChange(hour, Number(e.target.value), second)}
        className="rounded border px-1 py-0.5 text-sm"
      >
        {Array.from({ length: 60 }, (_, i) => (
          <option key={pad(i)} value={i}>
            {pad(i)}
          </option>
        ))}
      </select>
      <span>:</span>
      <select
        value={second}
        disabled={disabled}
        onChange={(e) => onChange(hour, minute, Number(e.target.value))}
        className="rounded border px-1 py-0.5 text-sm"
      >
        {Array.from({ length: 60 }, (_, i) => (
          <option key={pad(i)} value={i}>
            {pad(i)}
          </option>
        ))}
      </select>
    </div>
  )
}

export interface DateTimePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  disabled?: boolean
  placeholder?: string
  allowClear?: boolean
  className?: string
}

export function DateTimePicker({
  value,
  onChange,
  disabled,
  placeholder = 'Pick date & time',
  allowClear = true,
  className,
}: DateTimePickerProps) {
  const hour = value ? value.getHours() : 0
  const minute = value ? value.getMinutes() : 0
  const second = value ? value.getSeconds() : 0
  const showClear = allowClear && value && !disabled

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

  function handleClear(
    event: React.PointerEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault()
    event.stopPropagation()
    onChange?.(undefined)
  }

  return (
    <Popover>
      <div className={cn('relative w-full', className)}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              'w-full justify-start text-left font-normal',
              showClear && 'pr-8',
              !value && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            <span className="min-w-0 flex-1 truncate text-left">
              {value ? format(value, 'PPP HH:mm:ss') : placeholder}
            </span>
          </Button>
        </PopoverTrigger>
        {showClear && (
          <button
            type="button"
            tabIndex={-1}
            aria-label="Clear date and time"
            onPointerDown={handleClear}
            onClick={handleClear}
            className="absolute top-1/2 right-2 z-10 flex size-5 -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={14} />
          </button>
        )}
      </div>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={value} onSelect={handleDaySelect} />
        <TimeSelect
          hour={hour}
          minute={minute}
          second={second}
          disabled={!value || disabled}
          onChange={handleTimeChange}
        />
      </PopoverContent>
    </Popover>
  )
}
