"use client"

import type * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

export interface TimePickerProps {
  value?: string // HH:mm:ss
  onChange?: (value: string | undefined) => void
  disabled?: boolean
  placeholder?: string
  className?: string
  allowClear?: boolean
}

export function TimePicker({
  value,
  onChange,
  disabled,
  className,
  allowClear,
}: TimePickerProps) {
  const pad = (n: number) => String(n).padStart(2, "0")
  const parts = value ? value.split(":") : []
  const hour = parts[0] ? Number(parts[0]) : 0
  const minute = parts[1] ? Number(parts[1]) : 0
  const second = parts[2] ? Number(parts[2]) : 0

  function emit(h: number, m: number, s: number) {
    onChange?.(`${pad(h)}:${pad(m)}:${pad(s)}`)
  }

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
    <div
      className={cn(
        "flex h-9 w-fit items-center gap-1 rounded-md border border-input bg-transparent px-3 shadow-xs",
        allowClear && value && !disabled && "pr-8",
        "relative",
        className
      )}
    >
      <select
        value={hour}
        disabled={disabled}
        onChange={(e) => emit(Number(e.target.value), minute, second)}
        className="bg-transparent text-sm outline-none"
      >
        {Array.from({ length: 24 }, (_, i) => (
          <option key={pad(i)} value={i}>
            {pad(i)}
          </option>
        ))}
      </select>
      <span className="text-muted-foreground">:</span>
      <select
        value={minute}
        disabled={disabled}
        onChange={(e) => emit(hour, Number(e.target.value), second)}
        className="bg-transparent text-sm outline-none"
      >
        {Array.from({ length: 60 }, (_, i) => (
          <option key={pad(i)} value={i}>
            {pad(i)}
          </option>
        ))}
      </select>
      <span className="text-muted-foreground">:</span>
      <select
        value={second}
        disabled={disabled}
        onChange={(e) => emit(hour, minute, Number(e.target.value))}
        className="bg-transparent text-sm outline-none"
      >
        {Array.from({ length: 60 }, (_, i) => (
          <option key={pad(i)} value={i}>
            {pad(i)}
          </option>
        ))}
      </select>
      {allowClear && value && !disabled && (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Clear time"
          onPointerDown={handleClear}
          onClick={handleClear}
          className="absolute top-1/2 right-2 z-10 flex size-5 -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}

