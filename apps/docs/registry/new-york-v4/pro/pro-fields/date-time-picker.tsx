'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
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
  className?: string
}

export function DateTimePicker({
  value,
  onChange,
  disabled,
  placeholder = 'Pick date & time',
  className,
}: DateTimePickerProps) {
  const hour = value ? value.getHours() : 0
  const minute = value ? value.getMinutes() : 0
  const second = value ? value.getSeconds() : 0

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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, 'PPP HH:mm:ss') : placeholder}
        </Button>
      </PopoverTrigger>
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

