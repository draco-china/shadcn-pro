"use client"

import type * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export interface DigitRangeValue {
  min?: number
  max?: number
}

export interface DigitRangeProps {
  value?: DigitRangeValue
  onChange?: (value: DigitRangeValue | undefined) => void
  placeholder?: [string, string]
  disabled?: boolean
  className?: string
  allowClear?: boolean
}

export function DigitRange({
  value,
  onChange,
  placeholder = ["Min", "Max"],
  disabled,
  className,
  allowClear,
}: DigitRangeProps) {
  const hasValue =
    (value?.min !== undefined && !Number.isNaN(value.min)) ||
    (value?.max !== undefined && !Number.isNaN(value.max))

  function handleMinChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value
    const num = raw === "" ? undefined : Number(raw)
    onChange?.({ ...value, min: Number.isNaN(num) ? undefined : num })
  }

  function handleMaxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value
    const num = raw === "" ? undefined : Number(raw)
    onChange?.({ ...value, max: Number.isNaN(num) ? undefined : num })
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
    <div className={cn("relative flex items-center gap-2", className)}>
      <div className="flex h-9 flex-1 items-center rounded-md border border-input bg-transparent px-3 shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 dark:bg-input/30">
        <Input
          type="number"
          value={value?.min ?? ""}
          onChange={handleMinChange}
          placeholder={placeholder[0]}
          disabled={disabled}
          className="h-auto min-w-0 flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
        />
      </div>
      <span className="shrink-0 text-muted-foreground">~</span>
      <div
        className={cn(
          "flex h-9 flex-1 items-center rounded-md border border-input bg-transparent px-3 shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 dark:bg-input/30",
          allowClear && hasValue && "pr-8"
        )}
      >
        <Input
          type="number"
          value={value?.max ?? ""}
          onChange={handleMaxChange}
          placeholder={placeholder[1]}
          disabled={disabled}
          className="h-auto min-w-0 flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
        />
      </div>
      {allowClear && hasValue && (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Clear number range"
          onPointerDown={handleClear}
          onClick={handleClear}
          className="absolute top-1/2 right-2 z-10 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}

