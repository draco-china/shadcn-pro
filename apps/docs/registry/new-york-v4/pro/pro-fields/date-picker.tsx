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

export interface DatePickerBaseProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  disabled?: boolean
  placeholder?: string
  dateFormat?: string
  allowClear?: boolean
  className?: string
}

export function DatePickerBase({
  value,
  onChange,
  disabled,
  placeholder = "Pick a date",
  dateFormat = "PPP",
  allowClear,
  className,
}: DatePickerBaseProps) {
  const showClear = allowClear && value && !disabled

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
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span className="min-w-0 flex-1 truncate text-left">
              {value ? format(value, dateFormat) : placeholder}
            </span>
          </Button>
        </PopoverTrigger>
        {showClear && (
          <button
            type="button"
            tabIndex={-1}
            aria-label="Clear date"
            onPointerDown={handleClear}
            onClick={handleClear}
            className="absolute top-1/2 right-2 z-10 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={14} />
          </button>
        )}
      </div>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={value} onSelect={onChange} />
      </PopoverContent>
    </Popover>
  )
}

export { DatePickerBase as DatePicker }
