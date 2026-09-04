'use client'

import { Check, ChevronDown, ChevronRight } from 'lucide-react'
import { Popover as PopoverPrimitive } from 'radix-ui'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { ProButton } from '../../button'
import { CheckboxControl } from '../checkbox'
import { FieldClearAction, FieldPopoverContent, fieldTriggerClassName } from '../shared/field'

/** Recursive option shared by cascader and tree-select fields. */
export interface NestedOption {
  label: string
  value: string
  disabled?: boolean
  children?: NestedOption[]
}

const EMPTY_OPTIONS: NestedOption[] = []
const EMPTY_VALUE: string[] = []

/** Internal cascader implementation exposed through the select entry point. */
export function CascaderField({
  value,
  defaultValue,
  onChange,
  options,
  placeholder = 'Select...',
  disabled,
  required,
  className,
  id,
  name,
}: {
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  options?: NestedOption[]
  placeholder?: string
  disabled?: boolean
  required?: boolean
  className?: string
  id?: string
  name?: string
}) {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue ?? EMPTY_VALUE)
  const selectedPath = value ?? internalValue
  const optionColumns = options ?? EMPTY_OPTIONS
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
    if (value === undefined) setInternalValue(nextSelected)
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
            id={id}
            name={name}
            type="button"
            role="combobox"
            disabled={disabled}
            aria-expanded={open}
            aria-required={required}
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
          <FieldClearAction
            label="Clear selection"
            onClear={() => {
              if (value === undefined) setInternalValue(EMPTY_VALUE)
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
                    {option.children?.length ? <ChevronRight /> : null}
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

/** Internal tree-select implementation exposed through the select entry point. */
export function TreeSelectField({
  value,
  defaultValue,
  onChange,
  options = EMPTY_OPTIONS,
  placeholder = 'Select...',
  disabled,
  required,
  multiple = false,
  className,
  id,
  name,
}: {
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  options?: NestedOption[]
  placeholder?: string
  disabled?: boolean
  required?: boolean
  multiple?: boolean
  className?: string
  id?: string
  name?: string
}) {
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue ?? [])
  const currentValue = value ?? internalValue
  const selectedValues = new Set(currentValue)
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

  function toggle(nextValue: string) {
    if (multiple) {
      const next = selectedValues.has(nextValue)
        ? currentValue.filter((item) => item !== nextValue)
        : [...currentValue, nextValue]
      if (value === undefined) setInternalValue(next)
      onChange?.(next)
      return
    }
    const next = [nextValue]
    if (value === undefined) setInternalValue(next)
    onChange?.(next)
    setOpen(false)
  }

  return (
    <PopoverPrimitive.Root data-slot="field-popover" open={open} onOpenChange={setOpen}>
      <div className={cn('relative w-full', className)}>
        <PopoverPrimitive.Trigger data-slot="field-popover-trigger" asChild>
          <button
            id={id}
            name={name}
            type="button"
            role="combobox"
            disabled={disabled}
            aria-expanded={open}
            aria-required={required}
            className={cn(
              fieldTriggerClassName,
              currentValue.length === 0 && 'text-muted-foreground',
              currentValue.length > 0 && !disabled && !required && 'pr-8',
            )}
          >
            <span className="flex-1 truncate text-left">
              {selectedLabels.length ? selectedLabels.join(', ') : placeholder}
            </span>
          </button>
        </PopoverPrimitive.Trigger>
        {currentValue.length > 0 && !disabled && !required && (
          <FieldClearAction
            label="Clear selection"
            onClear={() => {
              if (value === undefined) setInternalValue([])
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
  const ExpandIcon = expanded ? ChevronDown : ChevronRight

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
            <ExpandIcon />
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
            {isSelected && <Check />}
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
