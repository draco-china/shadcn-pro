"use client"

import type * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export interface DigitProps extends Omit<
  React.ComponentProps<typeof Input>,
  "value" | "defaultValue" | "onChange" | "prefix"
> {
  value?: number
  onChange?: (value: number | undefined) => void
  allowClear?: boolean
}

export function Digit({
  value,
  onChange,
  placeholder = "Enter number",
  disabled,
  className,
  allowClear,
  min,
  max,
  step = 1,
  ...props
}: DigitProps) {
  const hasValue = value !== undefined && value !== null && !Number.isNaN(value)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value
    if (raw === "") {
      onChange?.(undefined)
    } else {
      const num = Number(raw)
      if (!Number.isNaN(num)) onChange?.(num)
    }
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
        "flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 shadow-xs",
        "transition-[color,box-shadow]",
        "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
        "has-disabled:pointer-events-none has-disabled:opacity-50",
        "dark:bg-input/30",
        className
      )}
    >
      <Input
        type="number"
        value={hasValue ? value : ""}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        {...props}
        className="h-auto min-w-0 flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
      />
      {allowClear && hasValue && (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Clear number"
          onPointerDown={handleClear}
          onClick={handleClear}
          className="ml-1.5 shrink-0 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}

