'use client'

import { Check, ChevronDown, X } from 'lucide-react'
import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select as ShadcnSelect,
  SelectContent as ShadcnSelectContent,
  SelectItem as ShadcnSelectItem,
  SelectTrigger as ShadcnSelectTrigger,
  SelectValue as ShadcnSelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

export interface SelectOption {
  label: React.ReactNode
  value: string
  description?: React.ReactNode
  disabled?: boolean
}

export interface SelectProps
  extends Omit<
    React.ComponentProps<typeof ShadcnSelect>,
    'value' | 'defaultValue' | 'onValueChange' | 'disabled'
  > {
  value?: string | string[]
  defaultValue?: string | string[]
  onChange?: (value: string | string[] | undefined) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  options?: SelectOption[]
  allowClear?: boolean
  multiple?: boolean
  searchable?: boolean
  searchPlaceholder?: string
  emptyText?: React.ReactNode
  maxTagCount?: number
  className?: string
  triggerClassName?: string
  contentClassName?: string
}

const selectTriggerClassName = cn(
  'h-9 w-full justify-between rounded-md border border-input bg-transparent px-3 text-sm font-normal shadow-xs',
  'transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
  'disabled:opacity-50 dark:bg-input/30',
)

export function Select({
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled,
  required,
  options = [],
  allowClear = true,
  multiple = false,
  searchable = false,
  searchPlaceholder,
  emptyText = 'No results found.',
  maxTagCount = 2,
  className,
  triggerClassName,
  contentClassName,
  ...props
}: SelectProps) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState<string | string[] | undefined>(
    defaultValue,
  )
  const [open, setOpen] = React.useState(false)
  const currentValue = isControlled ? value : internalValue
  const showClear = allowClear && currentValue && !disabled && !required
  const selectedValues = React.useMemo(() => {
    if (!currentValue) return []
    return Array.isArray(currentValue) ? currentValue : [currentValue]
  }, [currentValue])
  const selectedOptions = options.filter((option) => selectedValues.includes(option.value))

  function handleChange(nextValue: string | string[] | undefined) {
    if (!isControlled) setInternalValue(nextValue)
    onChange?.(nextValue)
  }

  function handleClear(
    event: React.PointerEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault()
    event.stopPropagation()
    handleChange(undefined)
  }

  function handleCommandSelect(optionValue: string) {
    if (!multiple) {
      handleChange(optionValue)
      setOpen(false)
      return
    }

    const next = new Set(selectedValues)
    if (next.has(optionValue)) {
      next.delete(optionValue)
    } else {
      next.add(optionValue)
    }

    const nextValues = Array.from(next)
    handleChange(nextValues.length ? nextValues : undefined)
  }

  if (multiple || searchable) {
    const selectedLabel = getSelectedLabel(selectedOptions, placeholder, maxTagCount)

    return (
      <div className={cn('relative flex w-full items-center', className)}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              role="combobox"
              disabled={disabled}
              className={cn(
                selectTriggerClassName,
                'hover:bg-transparent hover:text-foreground dark:hover:bg-input/30',
                !selectedOptions.length && 'text-muted-foreground hover:text-muted-foreground',
                showClear && 'pr-14',
                triggerClassName,
              )}
            >
              <span className="flex min-w-0 flex-1 items-center gap-1 truncate text-left">
                {selectedLabel}
              </span>
              <ChevronDown className="size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={cn('w-[var(--radix-popover-trigger-width)] p-0', contentClassName)}
          >
            <Command>
              {searchable && (
                <CommandInput placeholder={searchPlaceholder ?? placeholder ?? 'Search...'} />
              )}
              <CommandList>
                <CommandEmpty>{emptyText}</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => {
                    const selected = selectedValues.includes(option.value)

                    return (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        onSelect={() => handleCommandSelect(option.value)}
                      >
                        <Check className={cn('size-4', selected ? 'opacity-100' : 'opacity-0')} />
                        <span className="grid gap-1">
                          <span>{option.label}</span>
                          {option.description && (
                            <span className="text-xs leading-snug text-muted-foreground">
                              {option.description}
                            </span>
                          )}
                        </span>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {showClear && <SelectClearButton onClear={handleClear} className="right-8" />}
      </div>
    )
  }

  const selectedOption = options.find((option) => option.value === currentValue)

  return (
    <div className={cn('relative flex w-full items-center', className)}>
      <ShadcnSelect
        value={typeof currentValue === 'string' ? currentValue : undefined}
        onValueChange={handleChange}
        disabled={disabled}
        required={required}
        {...props}
      >
        <ShadcnSelectTrigger
          className={cn(
            selectTriggerClassName,
            showClear && '*:data-[slot=select-value]:pr-8',
            triggerClassName,
          )}
        >
          <ShadcnSelectValue placeholder={placeholder ?? 'Select...'}>
            {currentValue ? (
              <span className="line-clamp-1 flex flex-1 items-center gap-2 text-left">
                {selectedOption?.label}
              </span>
            ) : undefined}
          </ShadcnSelectValue>
        </ShadcnSelectTrigger>
        <ShadcnSelectContent className={contentClassName}>
          {options.map((opt) => (
            <ShadcnSelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
              <span className="grid gap-1">
                <span>{opt.label}</span>
                {opt.description && (
                  <span className="text-xs leading-snug text-muted-foreground">
                    {opt.description}
                  </span>
                )}
              </span>
            </ShadcnSelectItem>
          ))}
        </ShadcnSelectContent>
      </ShadcnSelect>
      {showClear && <SelectClearButton onClear={handleClear} />}
    </div>
  )
}

function getSelectedLabel(
  selectedOptions: SelectOption[],
  placeholder: string | undefined,
  maxTagCount: number,
) {
  if (!selectedOptions.length) return placeholder ?? 'Select...'

  if (selectedOptions.length === 1) {
    return <span className="truncate">{selectedOptions[0]?.label}</span>
  }

  const visibleOptions = selectedOptions.slice(0, maxTagCount)
  const overflow = selectedOptions.length - visibleOptions.length

  return (
    <>
      {visibleOptions.map((option) => (
        <Badge key={option.value} variant="secondary" className="max-w-24 truncate px-1.5">
          {option.label}
        </Badge>
      ))}
      {overflow > 0 && (
        <Badge variant="secondary" className="px-1.5">
          +{overflow}
        </Badge>
      )}
    </>
  )
}

function SelectClearButton({
  onClear,
  className,
}: {
  onClear: (
    event: React.PointerEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>,
  ) => void
  className?: string
}) {
  return (
    <button
      type="button"
      tabIndex={-1}
      aria-label="Clear selection"
      onPointerDown={onClear}
      onClick={onClear}
      className={cn(
        'absolute top-1/2 right-8 z-10 flex size-5 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
        className,
      )}
    >
      <X size={14} />
    </button>
  )
}
