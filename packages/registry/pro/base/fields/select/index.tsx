'use client'

import { Command as CommandPrimitive } from 'cmdk'
import { Check, ChevronDown, ChevronUp, SearchIcon } from 'lucide-react'
import { Popover as PopoverPrimitive, Select as SelectPrimitive } from 'radix-ui'
import { type FocusEventHandler, type ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'
import { FieldClearAction, FieldPopoverContent, fieldTriggerClassName } from '../shared/field'
import { CascaderField, TreeSelectField } from './tree'

/** Selects one or multiple values with optional search. */

export function Select({
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled,
  required,
  options,
  allowClear = false,
  multiple = false,
  searchable = false,
  className,
  id,
  name,
  onBlur,
}: {
  value?: string | string[]
  defaultValue?: string | string[]
  onChange?: (value: string | string[] | undefined) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  options?: {
    label: ReactNode
    value: string
    description?: ReactNode
    disabled?: boolean
  }[]
  allowClear?: boolean
  multiple?: boolean
  searchable?: boolean
  className?: string
  id?: string
  name?: string
  onBlur?: FocusEventHandler<HTMLElement>
}) {
  const [internalValue, setInternalValue] = useState<string | string[] | undefined>(defaultValue)
  const [open, setOpen] = useState(false)
  const currentValue = value ?? internalValue
  const selectedValues = getSelectedValues(currentValue)
  const selectedValueSet = new Set(selectedValues)
  const selectedOptions = options?.filter((option) => selectedValueSet.has(option.value)) ?? []
  const selectedCount = selectedOptions.length
  const selectPlaceholder = placeholder ?? 'Select...'
  const showClear = allowClear && selectedValues.length > 0 && !disabled && !required

  function handleChange(nextValue: string | string[] | undefined) {
    if (value === undefined) setInternalValue(nextValue)
    onChange?.(nextValue)
  }

  function handleCommandSelect(optionValue: string) {
    if (!multiple) {
      handleChange(optionValue)
      setOpen(false)
      return
    }

    const nextValues = selectedValueSet.has(optionValue)
      ? selectedValues.filter((selectedValue) => selectedValue !== optionValue)
      : [...selectedValues, optionValue]
    if (nextValues.length === 0) {
      handleChange(undefined)
      return
    }
    handleChange(nextValues)
  }

  if (multiple || searchable) {
    return (
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger asChild>
          <button
            id={id}
            name={name}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-required={required}
            disabled={disabled}
            onBlur={onBlur}
            className={cn(
              fieldTriggerClassName,
              'group/select w-full justify-between font-normal disabled:pointer-events-none disabled:opacity-50',
              selectedCount === 0 && 'text-muted-foreground hover:text-muted-foreground',
              className,
            )}
          >
            <span className="flex min-w-0 flex-1 items-center gap-1 truncate text-left">
              {renderSelectedOptions(selectedOptions, selectedCount, selectPlaceholder)}
            </span>
            <span className="relative flex size-4 shrink-0 items-center justify-center">
              {showClear && (
                <FieldClearAction
                  label="Clear selection"
                  onClear={() => handleChange(undefined)}
                  className={
                    'pointer-events-none absolute inset-0 z-10 opacity-0 group-hover/select:pointer-events-auto group-hover/select:opacity-100 group-focus-within/select:pointer-events-auto group-focus-within/select:opacity-100'
                  }
                />
              )}
              <ChevronDown
                className={cn(
                  'size-4 opacity-50',
                  showClear && 'group-hover/select:opacity-0 group-focus-within/select:opacity-0',
                )}
              />
            </span>
          </button>
        </PopoverPrimitive.Trigger>
        <FieldPopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <CommandPrimitive
            className={
              'flex size-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground'
            }
          >
            {searchable && (
              <div className="flex h-9 items-center gap-2 border-b px-3">
                <SearchIcon className="size-4 shrink-0 opacity-50" />
                <CommandPrimitive.Input
                  placeholder={placeholder ?? 'Search...'}
                  className={
                    'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
                  }
                />
              </div>
            )}
            <CommandPrimitive.List className="max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto">
              <CommandPrimitive.Empty className="py-6 text-center text-sm">
                No results found.
              </CommandPrimitive.Empty>
              <CommandPrimitive.Group className="overflow-hidden p-1 text-foreground">
                {options?.map((option) => (
                  <CommandPrimitive.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    onSelect={() => handleCommandSelect(option.value)}
                    className={
                      "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground"
                    }
                  >
                    <Check
                      className={cn(
                        'size-4',
                        selectedValueSet.has(option.value) ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    <span className="grid gap-1">
                      <span>{option.label}</span>
                      {option.description != null && (
                        <span className="text-xs leading-snug text-muted-foreground">
                          {option.description}
                        </span>
                      )}
                    </span>
                  </CommandPrimitive.Item>
                ))}
              </CommandPrimitive.Group>
            </CommandPrimitive.List>
          </CommandPrimitive>
        </FieldPopoverContent>
      </PopoverPrimitive.Root>
    )
  }

  return (
    <SelectPrimitive.Root
      data-slot="field-select"
      value={selectedValues[0]}
      onValueChange={handleChange}
      disabled={disabled}
      name={name}
      required={required}
    >
      <SelectPrimitive.Trigger
        id={id}
        data-slot="field-select-trigger"
        disabled={disabled}
        onBlur={onBlur}
        className={cn(
          fieldTriggerClassName,
          'group/select w-full justify-between font-normal disabled:pointer-events-none disabled:opacity-50',
          selectedValues.length === 0 && 'text-muted-foreground',
          className,
        )}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2 text-left">
          <SelectPrimitive.Value data-slot="field-select-value" placeholder={selectPlaceholder}>
            {selectedValues.length > 0 ? (
              <span className="line-clamp-1 flex min-w-0 flex-1 items-center gap-2 text-left">
                {selectedOptions[0]?.label}
              </span>
            ) : undefined}
          </SelectPrimitive.Value>
        </span>
        <span className="relative flex size-4 shrink-0 items-center justify-center">
          {showClear && (
            <FieldClearAction
              label="Clear selection"
              onClear={() => handleChange(undefined)}
              className={
                'pointer-events-none absolute inset-0 z-10 opacity-0 group-hover/select:pointer-events-auto group-hover/select:opacity-100 group-focus-within/select:pointer-events-auto group-focus-within/select:opacity-100'
              }
            />
          )}
          <ChevronDown
            className={cn(
              'size-4 opacity-50',
              showClear && 'group-hover/select:opacity-0 group-focus-within/select:opacity-0',
            )}
          />
        </span>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          data-slot="field-select-content"
          position="item-aligned"
          className={
            'relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95'
          }
        >
          <SelectPrimitive.ScrollUpButton
            data-slot="field-select-scroll-up-button"
            className="flex cursor-default items-center justify-center py-1"
          >
            <ChevronUp className="size-4" />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="p-1">
            {options?.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                data-slot="field-select-item"
                className={
                  'relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4 [&_svg:not([class*=text-])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2'
                }
              >
                <span
                  data-slot="field-select-item-indicator"
                  className="absolute right-2 flex size-3.5 items-center justify-center"
                >
                  <SelectPrimitive.ItemIndicator>
                    <Check className="size-4" />
                  </SelectPrimitive.ItemIndicator>
                </span>
                <SelectPrimitive.ItemText>
                  <span className="grid gap-1">
                    <span>{option.label}</span>
                    {option.description != null && (
                      <span className="text-xs leading-snug text-muted-foreground">
                        {option.description}
                      </span>
                    )}
                  </span>
                </SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton
            data-slot="field-select-scroll-down-button"
            className="flex cursor-default items-center justify-center py-1"
          >
            <ChevronDown className="size-4" />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}

/** Selects a hierarchical path. */
export const Cascader = CascaderField

/** Selects one or multiple values from a tree. */
export const TreeSelect = TreeSelectField

function getSelectedValues(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value
  if (typeof value === 'string') return [value]
  return []
}

function renderSelectedOptions(
  selectedOptions: Array<{ label: ReactNode; value: string }>,
  selectedCount: number,
  placeholder: ReactNode,
) {
  if (selectedCount === 1) {
    return <span className="truncate">{selectedOptions[0]?.label}</span>
  }

  if (selectedCount <= 1) return placeholder

  return (
    <>
      {selectedOptions.slice(0, 2).map((option) => (
        <span
          key={option.value}
          className={
            'inline-flex max-w-24 shrink-0 items-center justify-center truncate rounded-full bg-secondary px-1.5 py-0.5 text-xs font-medium text-secondary-foreground'
          }
        >
          {option.label}
        </span>
      ))}
      {selectedCount > 2 && (
        <span
          className={
            'inline-flex shrink-0 items-center justify-center rounded-full bg-secondary px-1.5 py-0.5 text-xs font-medium text-secondary-foreground'
          }
        >
          +{selectedCount - 2}
        </span>
      )}
    </>
  )
}
