import type { ComponentType } from 'react'

export interface FacetedFilterOption {
  label: string
  value: string
  icon?: ComponentType<{ className?: string }>
}

export interface FacetedFilterProps {
  /** Selected value(s). Single select: string | undefined. Multiple select: string[] */
  value?: string | string[]
  onChange?: (value: string | string[] | undefined) => void
  options?: FacetedFilterOption[]
  placeholder?: string
  /** Allows multiple selection by returning string[] values. */
  multiple?: boolean
  /** Facet counts from getFacetedUniqueValues() — shows count next to each option */
  facets?: Map<string, number>
  className?: string
}
