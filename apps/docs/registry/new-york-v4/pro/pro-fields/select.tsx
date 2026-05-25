"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectBaseProps extends Omit<
  React.ComponentProps<typeof Select>,
  "value" | "defaultValue" | "onValueChange" | "disabled"
> {
  value?: string
  defaultValue?: string
  onChange?: (value: string | undefined) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  options?: SelectOption[]
  allowClear?: boolean
  className?: string
  triggerClassName?: string
  contentClassName?: string
}

export function SelectBase({
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled,
  required,
  options = [],
  allowClear,
  className,
  triggerClassName,
  contentClassName,
  ...props
}: SelectBaseProps) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState<string | undefined>(
    defaultValue
  )
  const currentValue = isControlled ? value : internalValue
  const showClear = allowClear && currentValue && !disabled && !required
  const selectedLabel = options.find(
    (option) => option.value === currentValue
  )?.label

  function handleChange(nextValue: string | undefined) {
    if (!isControlled) setInternalValue(nextValue)
    onChange?.(nextValue)
  }

  function handleClear(
    event:
      | React.PointerEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault()
    event.stopPropagation()
    handleChange(undefined)
  }

  return (
    <div className={cn("relative flex w-full items-center", className)}>
      <Select
        value={currentValue}
        onValueChange={handleChange}
        disabled={disabled}
        required={required}
        {...props}
      >
        <SelectTrigger
          className={cn(
            "w-full",
            showClear && "*:data-[slot=select-value]:pr-8",
            triggerClassName
          )}
        >
          <SelectValue placeholder={placeholder ?? "Select..."}>
            {currentValue ? (
              <span className="line-clamp-1 flex flex-1 items-center gap-2 text-left">
                {selectedLabel}
              </span>
            ) : undefined}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className={contentClassName}>
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {showClear && (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Clear selection"
          onPointerDown={(event) => {
            handleClear(event)
          }}
          onClick={handleClear}
          className="absolute top-1/2 right-8 z-10 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
