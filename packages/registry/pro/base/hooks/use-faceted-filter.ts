'use client'

import { useMemo } from 'react'

export interface UseFacetedFilterOptions {
  value?: string | string[]
  multiple?: boolean
  onChange?: (value: string | string[] | undefined) => void
}

export function useFacetedFilter({ value, multiple, onChange }: UseFacetedFilterOptions) {
  const selectedValues = useMemo(() => {
    if (Array.isArray(value)) return new Set(value)
    if (value === undefined) return new Set<string>()
    return new Set([value])
  }, [value])

  function select(optionValue: string) {
    if (!multiple) {
      onChange?.(selectedValues.has(optionValue) ? undefined : optionValue)
      return
    }

    const next = new Set(selectedValues)
    if (next.has(optionValue)) {
      next.delete(optionValue)
    } else {
      next.add(optionValue)
    }

    const nextValues = Array.from(next)
    onChange?.(nextValues.length ? nextValues : undefined)
  }

  return {
    selectedValues,
    select,
    clear: () => onChange?.(undefined),
  }
}
