'use client'

import { useMemo, useState } from 'react'
import { getSelectCommandOptions } from './command-options'
import type { SelectOption, SelectProps } from './types'

export function useSelect({
  value,
  defaultValue,
  onChange,
  options,
  multiple,
}: Pick<SelectProps, 'value' | 'defaultValue' | 'onChange' | 'options' | 'multiple'>) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState<string | string[] | undefined>(defaultValue)
  const [open, setOpen] = useState(false)
  const currentValue = isControlled ? value : internalValue
  const selectedValues = useMemo(() => getSelectedValues(currentValue), [currentValue])
  const selectedOptions = getSelectedOptions(options, selectedValues)

  function handleChange(nextValue: string | string[] | undefined) {
    if (!isControlled) setInternalValue(nextValue)
    onChange?.(nextValue)
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

  return {
    open,
    setOpen,
    currentValue,
    selectedValues,
    selectedOptions,
    commandOptions: getSelectCommandOptions({
      options,
      selectedValues,
      onSelect: handleCommandSelect,
    }),
    handleChange,
  }
}

function getSelectedValues(value: string | string[] | undefined) {
  if (value === undefined) return []
  return Array.isArray(value) ? value : [value]
}

function getSelectedOptions(options: SelectOption[] | undefined, selectedValues: string[]) {
  return options?.filter((option) => selectedValues.includes(option.value)) ?? []
}
