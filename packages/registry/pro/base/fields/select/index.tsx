'use client'

import { Command as CommandPrimitive } from 'cmdk'
import { Check, ChevronDown, ChevronRight, ChevronUp, SearchIcon, X } from 'lucide-react'
import { Popover as PopoverPrimitive, Select as SelectPrimitive } from 'radix-ui'
import { type ReactNode, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { ProButton } from '../../button'
import { CheckboxControl } from '../checkbox'
import { FieldPopoverContent, fieldTriggerClassName } from '../shared/field'

interface NestedOption {
  label: string
  value: string
  disabled?: boolean
  children?: NestedOption[]
}

const EMPTY_CASCADER_OPTIONS: NestedOption[] = []
const EMPTY_CASCADER_VALUE: string[] = []

function SelectClearAction({
  label,
  onClear,
  className,
}: {
  label: string
  onClear: () => void
  className?: string
}) {
  function clear(event: { preventDefault: () => void; stopPropagation: () => void }) {
    event.preventDefault()
    event.stopPropagation()
    onClear()
  }

  return (
    // biome-ignore lint/a11y/useSemanticElements: select triggers are buttons, so the clear affordance cannot be a nested button.
    <span
      role="button"
      tabIndex={0}
      aria-label={label}
      className={cn(
        "inline-flex size-4 items-center justify-center rounded-sm outline-hidden [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      onPointerDown={clear}
      onClick={clear}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return
        clear(event)
      }}
    >
      <X />
    </span>
  )
}

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
}) {
  const [internalValue, setInternalValue] = useState<string | string[] | undefined>(defaultValue)
  const [open, setOpen] = useState(false)
  const currentValue = value ?? internalValue
  const selectedValues = Array.isArray(currentValue)
    ? currentValue
    : typeof currentValue === 'string'
      ? [currentValue]
      : []
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
            type="button"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              fieldTriggerClassName,
              'group/select w-full justify-between font-normal disabled:pointer-events-none disabled:opacity-50',
              selectedCount === 0 && 'text-muted-foreground hover:text-muted-foreground',
              className,
            )}
          >
            <span className="flex min-w-0 flex-1 items-center gap-1 truncate text-left">
              {selectedCount === 1 ? (
                <span className="truncate">{selectedOptions[0]?.label}</span>
              ) : selectedCount > 1 ? (
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
              ) : (
                selectPlaceholder
              )}
            </span>
            <span className="relative flex size-4 shrink-0 items-center justify-center">
              {showClear && (
                <SelectClearAction
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
      required={required}
    >
      <SelectPrimitive.Trigger
        data-slot="field-select-trigger"
        disabled={disabled}
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
            <SelectClearAction
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

export function Cascader({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  disabled,
  required,
  className,
}: {
  value?: string[]
  onChange?: (value: string[]) => void
  options?: NestedOption[]
  placeholder?: string
  disabled?: boolean
  required?: boolean
  className?: string
}) {
  const selectedPath = value ?? EMPTY_CASCADER_VALUE
  const optionColumns = options ?? EMPTY_CASCADER_OPTIONS
  const [open, setOpen] = useState(false)
  const [columns, setColumns] = useState<NestedOption[][]>([optionColumns])
  const [selected, setSelected] = useState<string[]>(selectedPath)
  const selectedLabels: string[] = []
  let currentOptions = optionColumns
  for (const selectedValue of selectedPath) {
    const selectedOption = currentOptions.find((option) => option.value === selectedValue)
    if (!selectedOption) {
      selectedLabels.length = 0
      break
    }
    currentOptions = selectedOption.children ?? []
    selectedLabels.push(selectedOption.label)
  }

  function handleSelect(option: NestedOption, columnIndex: number) {
    if (option.disabled) return

    const nextSelected = [...selected.slice(0, columnIndex), option.value]
    const childOptions = option.children ?? []
    setSelected(nextSelected)

    setColumns(
      childOptions.length
        ? [...columns.slice(0, columnIndex + 1), childOptions]
        : columns.slice(0, columnIndex + 1),
    )

    if (childOptions.length) return

    onChange?.(nextSelected)
    setOpen(false)
  }

  useEffect(() => {
    setColumns([optionColumns])
    setSelected(selectedPath)
  }, [optionColumns, selectedPath])

  return (
    <PopoverPrimitive.Root data-slot="field-popover" open={open} onOpenChange={setOpen}>
      <div className={cn('relative w-full', className)}>
        <PopoverPrimitive.Trigger data-slot="field-popover-trigger" asChild>
          <button
            type="button"
            disabled={disabled}
            aria-expanded={open}
            className={cn(
              fieldTriggerClassName,
              selectedPath.length === 0 && 'text-muted-foreground',
              selectedPath.length > 0 && !disabled && !required && 'pr-8',
            )}
          >
            <span className="flex-1 truncate text-left">
              {selectedLabels.length ? selectedLabels.join(' / ') : placeholder}
            </span>
          </button>
        </PopoverPrimitive.Trigger>
        {selectedPath.length > 0 && !disabled && !required && (
          <SelectClearAction
            label="Clear selection"
            onClear={() => {
              onChange?.([])
              setOpen(false)
            }}
            className="absolute top-1/2 right-3 z-10 -translate-y-1/2"
          />
        )}
      </div>
      <FieldPopoverContent className="w-auto p-0" align="start">
        <div className="flex divide-x">
          {columns.map((column, columnIndex) => (
            <ul
              // biome-ignore lint/suspicious/noArrayIndexKey: column index represents the cascader depth level.
              key={columnIndex}
              className="max-h-48 min-w-[120px] overflow-y-auto py-1"
            >
              {column.map((option) => (
                <li key={option.value}>
                  <ProButton
                    variant="ghost"
                    size="sm"
                    disabled={option.disabled}
                    onClick={() => handleSelect(option, columnIndex)}
                    className={cn(
                      'h-auto w-full justify-between px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50',
                      selected[columnIndex] === option.value && 'bg-accent font-medium',
                    )}
                  >
                    {option.label}
                    {option.children?.length ? (
                      <ChevronRight className="ml-2 size-3 opacity-60" />
                    ) : null}
                  </ProButton>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </FieldPopoverContent>
    </PopoverPrimitive.Root>
  )
}

export function TreeSelect({
  value = [],
  onChange,
  options = [],
  placeholder = 'Select...',
  disabled,
  required,
  multiple = false,
  className,
}: {
  value?: string[]
  onChange?: (value: string[]) => void
  options?: NestedOption[]
  placeholder?: string
  disabled?: boolean
  required?: boolean
  multiple?: boolean
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const selectedValues = new Set(value)
  const selectedLabels: string[] = []
  const optionStack = [...options].reverse()
  while (optionStack.length) {
    const option = optionStack.pop()
    if (!option) continue
    if (selectedValues.has(option.value)) selectedLabels.push(option.label)
    if (option.children) {
      for (let index = option.children.length - 1; index >= 0; index -= 1) {
        optionStack.push(option.children[index])
      }
    }
  }

  function toggle(val: string) {
    if (multiple) {
      if (!selectedValues.has(val)) {
        onChange?.([...value, val])
        return
      }

      onChange?.(value.filter((item) => item !== val))
      return
    }

    onChange?.([val])
    setOpen(false)
  }

  return (
    <PopoverPrimitive.Root data-slot="field-popover" open={open} onOpenChange={setOpen}>
      <div className={cn('relative w-full', className)}>
        <PopoverPrimitive.Trigger data-slot="field-popover-trigger" asChild>
          <button
            type="button"
            disabled={disabled}
            aria-expanded={open}
            className={cn(
              fieldTriggerClassName,
              value.length === 0 && 'text-muted-foreground',
              value.length > 0 && !disabled && !required && 'pr-8',
            )}
          >
            <span className="flex-1 truncate text-left">
              {selectedLabels.length ? selectedLabels.join(', ') : placeholder}
            </span>
          </button>
        </PopoverPrimitive.Trigger>
        {value.length > 0 && !disabled && !required && (
          <SelectClearAction
            label="Clear selection"
            onClear={() => {
              onChange?.([])
              setOpen(false)
            }}
            className="absolute top-1/2 right-3 z-10 -translate-y-1/2"
          />
        )}
      </div>
      <FieldPopoverContent className="w-64 p-1" align="start">
        <ul className="max-h-56 overflow-y-auto">
          {options.map((option) => (
            <TreeNode
              key={option.value}
              option={option}
              selected={selectedValues}
              onToggle={toggle}
              multiple={multiple}
            />
          ))}
        </ul>
      </FieldPopoverContent>
    </PopoverPrimitive.Root>
  )
}

function TreeNode({
  option,
  selected,
  onToggle,
  multiple,
}: {
  option: NestedOption
  selected: Set<string>
  onToggle: (value: string) => void
  multiple?: boolean
}) {
  const [expanded, setExpanded] = useState(false)
  const childOptions = option.children ?? []
  const hasChildren = childOptions.length > 0
  const isSelected = selected.has(option.value)

  return (
    <li>
      <div
        className={cn(
          'flex items-center gap-1.5 rounded-sm px-2 py-1 text-sm',
          option.disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        {hasChildren ? (
          <ProButton
            variant="ghost"
            size="icon-xs"
            aria-label={expanded ? 'Collapse' : 'Expand'}
            className="shrink-0"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronDown /> : <ChevronRight />}
          </ProButton>
        ) : (
          <span className="size-6 shrink-0" aria-hidden />
        )}
        {multiple ? (
          <>
            <CheckboxControl
              checked={isSelected}
              disabled={option.disabled}
              onCheckedChange={() => onToggle(option.value)}
              aria-label={option.label}
            />
            <ProButton
              variant="ghost"
              size="xs"
              disabled={option.disabled}
              onClick={() => onToggle(option.value)}
              className={cn(
                'h-auto flex-1 cursor-pointer justify-start rounded-sm px-1 py-0 text-left disabled:cursor-not-allowed',
                isSelected && 'font-medium',
              )}
            >
              {option.label}
            </ProButton>
          </>
        ) : (
          <ProButton
            variant="ghost"
            size="xs"
            disabled={option.disabled}
            onClick={() => onToggle(option.value)}
            className={cn(
              'h-auto flex-1 cursor-pointer justify-between rounded-sm px-1 py-0.5 text-left disabled:cursor-not-allowed',
              isSelected && 'font-medium',
            )}
          >
            <span>{option.label}</span>
            {isSelected && <Check className="size-3.5 text-primary" />}
          </ProButton>
        )}
      </div>
      {expanded && hasChildren && (
        <ul className="pl-4">
          {childOptions.map((child) => (
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
