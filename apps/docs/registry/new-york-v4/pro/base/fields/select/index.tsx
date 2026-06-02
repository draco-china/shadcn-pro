'use client'

import type { MouseEvent } from 'react'
import { MultiSelectView } from './multi-select'
import { SingleSelectView } from './single-select'
import type { SelectProps } from './types'
import { useSelect } from './use-select'

export type { SelectOption, SelectProps } from './types'

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
  searchPlaceholder,
  emptyText = 'No results found.',
  maxTagCount = 2,
  size,
  className,
  triggerClassName,
  contentClassName,
}: SelectProps) {
  const select = useSelect({ value, defaultValue, onChange, options, multiple })
  const showClear = allowClear && select.selectedValues.length > 0 && !disabled && !required

  function handleClear(_event: MouseEvent<HTMLButtonElement>) {
    select.handleChange(undefined)
  }

  if (multiple || searchable) {
    return (
      <MultiSelectView
        select={select}
        placeholder={placeholder}
        disabled={disabled}
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        emptyText={emptyText}
        maxTagCount={maxTagCount}
        size={size}
        className={className}
        triggerClassName={triggerClassName}
        contentClassName={contentClassName}
        showClear={showClear}
        onClear={handleClear}
      />
    )
  }

  return (
    <SingleSelectView
      select={select}
      options={options}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      size={size}
      className={className}
      triggerClassName={triggerClassName}
      contentClassName={contentClassName}
      showClear={showClear}
      onClear={handleClear}
    />
  )
}
