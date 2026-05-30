'use client'

import { Check, ChevronDown, ChevronRight, X } from 'lucide-react'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export interface TreeSelectOption {
  label: string
  value: string
  disabled?: boolean
  children?: TreeSelectOption[]
}

export interface TreeSelectProps {
  value?: string[]
  onChange?: (value: string[]) => void
  options?: TreeSelectOption[]
  placeholder?: string
  disabled?: boolean
  required?: boolean
  allowClear?: boolean
  multiple?: boolean
  className?: string
}

function getLabels(options: TreeSelectOption[], values: string[]): string {
  const labels: string[] = []
  function traverse(opts: TreeSelectOption[]) {
    for (const opt of opts) {
      if (values.includes(opt.value)) labels.push(opt.label)
      if (opt.children) traverse(opt.children)
    }
  }
  traverse(options)
  return labels.join(', ')
}

function TreeNode({
  option,
  selected,
  onToggle,
  multiple,
}: {
  option: TreeSelectOption
  selected: string[]
  onToggle: (value: string) => void
  multiple?: boolean
}) {
  const [expanded, setExpanded] = React.useState(false)
  const hasChildren = Boolean(option.children?.length)
  const isSelected = selected.includes(option.value)

  return (
    <li>
      <div
        className={cn(
          'flex items-center gap-1.5 rounded-sm px-2 py-1 text-sm',
          option.disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        <button
          type="button"
          aria-label={expanded ? 'Collapse' : 'Expand'}
          className="flex h-4 w-4 shrink-0 items-center justify-center"
          onClick={() => hasChildren && setExpanded(!expanded)}
        >
          {hasChildren ? (
            expanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )
          ) : null}
        </button>
        {multiple ? (
          <>
            <Checkbox
              checked={isSelected}
              disabled={option.disabled}
              onCheckedChange={() => !option.disabled && onToggle(option.value)}
              aria-label={option.label}
            />
            <button
              type="button"
              disabled={option.disabled}
              onClick={() => !option.disabled && onToggle(option.value)}
              onKeyDown={(e) => e.key === 'Enter' && !option.disabled && onToggle(option.value)}
              className={cn('flex-1 cursor-pointer text-left', isSelected && 'font-medium')}
            >
              {option.label}
            </button>
          </>
        ) : (
          <button
            type="button"
            disabled={option.disabled}
            onClick={() => !option.disabled && onToggle(option.value)}
            className={cn(
              'flex flex-1 cursor-pointer items-center justify-between rounded-sm px-1 py-0.5 text-left hover:bg-accent/50',
              isSelected && 'font-medium',
            )}
          >
            <span>{option.label}</span>
            {isSelected && <Check className="h-3.5 w-3.5 text-primary" />}
          </button>
        )}
      </div>
      {expanded && option.children && (
        <ul className="pl-4">
          {option.children.map((child) => (
            <TreeNode
              key={child.value}
              option={child}
              selected={selected}
              onToggle={onToggle}
              multiple={multiple}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export function TreeSelect({
  value = [],
  onChange,
  options = [],
  placeholder = 'Select...',
  disabled,
  required,
  allowClear,
  multiple = false,
  className,
}: TreeSelectProps) {
  const [open, setOpen] = React.useState(false)
  const label = value.length ? getLabels(options, value) : null
  const showClear = allowClear && label && !disabled && !required

  function handleClear(
    event: React.PointerEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault()
    event.stopPropagation()
    onChange?.([])
    setOpen(false)
  }

  function toggle(val: string) {
    if (multiple) {
      const next = value.includes(val) ? value.filter((v) => v !== val) : [...value, val]
      onChange?.(next)
    } else {
      onChange?.([val])
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={cn('relative w-full', className)}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              'w-full justify-start font-normal',
              showClear && 'pr-8',
              !label && 'text-muted-foreground',
            )}
          >
            <span className="flex-1 truncate text-left">{label ?? placeholder}</span>
          </Button>
        </PopoverTrigger>
        {showClear && (
          <button
            type="button"
            tabIndex={-1}
            aria-label="Clear selection"
            onPointerDown={handleClear}
            onClick={handleClear}
            className="absolute top-1/2 right-2 z-10 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={14} />
          </button>
        )}
      </div>
      <PopoverContent className="w-64 p-1" align="start">
        <ul className="max-h-56 overflow-y-auto">
          {options.map((opt) => (
            <TreeNode
              key={opt.value}
              option={opt}
              selected={value}
              onToggle={toggle}
              multiple={multiple}
            />
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
