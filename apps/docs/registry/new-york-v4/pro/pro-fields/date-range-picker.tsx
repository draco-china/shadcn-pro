"use client"

import type * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface DateRangeValue {
  from?: Date
  to?: Date
}

export interface DateRangePickerProps {
  value?: DateRangeValue
  onChange?: (value: DateRangeValue | undefined) => void
  disabled?: boolean
  placeholder?: string
  allowClear?: boolean
  className?: string
}

export function DateRangePickerBase({
  value,
  onChange,
  disabled,
  placeholder = "Pick date range",
  allowClear,
  className,
}: DateRangePickerProps) {
  const label = value?.from
    ? value.to
      ? `${format(value.from, "LLL dd, y")} – ${format(value.to, "LLL dd, y")}`
      : format(value.from, "LLL dd, y")
    : null
  const showClear = allowClear && label && !disabled

  function handleClear(
    event:
      | React.PointerEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault()
    event.stopPropagation()
    onChange?.(undefined)
  }

  return (
    <Popover>
      <div className={cn("relative w-full", className)}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal",
              showClear && "pr-8",
              !value?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span className="min-w-0 flex-1 truncate text-left">
              {label ?? placeholder}
            </span>
          </Button>
        </PopoverTrigger>
        {showClear && (
          <button
            type="button"
            tabIndex={-1}
            aria-label="Clear date range"
            onPointerDown={handleClear}
            onClick={handleClear}
            className="absolute top-1/2 right-2 z-10 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={14} />
          </button>
        )}
      </div>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={{ from: value?.from, to: value?.to }}
          onSelect={(range) =>
            onChange?.(range ? { from: range.from, to: range.to } : undefined)
          }
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DateRangePickerBase as DateRangePicker }
