"use client"

import * as React from "react"
import { ChevronRight, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface CascaderOption {
  label: string
  value: string
  disabled?: boolean
  children?: CascaderOption[]
}

export interface CascaderProps {
  value?: string[]
  onChange?: (value: string[]) => void
  options?: CascaderOption[]
  placeholder?: string
  disabled?: boolean
  required?: boolean
  allowClear?: boolean
  className?: string
}

function getLabel(options: CascaderOption[], path: string[]): string {
  let current = options
  const labels: string[] = []
  for (const val of path) {
    const found = current.find((o) => o.value === val)
    if (!found) break
    labels.push(found.label)
    current = found.children ?? []
  }
  return labels.join(" / ")
}

function CascaderPanel({
  options,
  path,
  onSelect,
}: {
  options: CascaderOption[]
  path: string[]
  onSelect: (path: string[]) => void
}) {
  const [cols, setCols] = React.useState<CascaderOption[][]>([options])
  const [selected, setSelected] = React.useState<string[]>(path)

  function handleClick(opt: CascaderOption, colIdx: number) {
    if (opt.disabled) return
    const newSelected = [...selected.slice(0, colIdx), opt.value]
    setSelected(newSelected)
    if (opt.children?.length) {
      setCols([...cols.slice(0, colIdx + 1), opt.children])
    } else {
      setCols(cols.slice(0, colIdx + 1))
      onSelect(newSelected)
    }
  }

  return (
    <div className="flex divide-x">
      {cols.map((col, colIdx) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: column index represents depth level, stable
        <ul
          key={colIdx}
          className="max-h-48 min-w-[120px] overflow-y-auto py-1"
        >
          {col.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                disabled={opt.disabled}
                onClick={() => handleClick(opt, colIdx)}
                className={cn(
                  "flex w-full items-center justify-between px-3 py-1.5 text-sm",
                  "hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50",
                  selected[colIdx] === opt.value && "bg-accent font-medium"
                )}
              >
                {opt.label}
                {opt.children?.length ? (
                  <ChevronRight className="ml-2 size-3 opacity-60" />
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

export function Cascader({
  value = [],
  onChange,
  options = [],
  placeholder = "Select...",
  disabled,
  required,
  allowClear,
  className,
}: CascaderProps) {
  const [open, setOpen] = React.useState(false)
  const label = value.length ? getLabel(options, value) : null
  const showClear = allowClear && label && !disabled && !required

  function handleClear(
    event:
      | React.PointerEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault()
    event.stopPropagation()
    onChange?.([])
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={cn("relative w-full", className)}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-start font-normal",
              showClear && "pr-8",
              !label && "text-muted-foreground"
            )}
          >
            <span className="flex-1 truncate text-left">
              {label ?? placeholder}
            </span>
          </Button>
        </PopoverTrigger>
        {showClear && (
          <button
            type="button"
            tabIndex={-1}
            aria-label="Clear selection"
            onPointerDown={handleClear}
            onClick={handleClear}
            className="absolute top-1/2 right-2 z-10 flex size-5 -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={14} />
          </button>
        )}
      </div>
      <PopoverContent className="w-auto p-0" align="start">
        <CascaderPanel
          options={options}
          path={value}
          onSelect={(path) => {
            onChange?.(path)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

