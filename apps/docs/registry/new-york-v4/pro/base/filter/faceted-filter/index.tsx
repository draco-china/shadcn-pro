'use client'

import { ProCommandMenu } from '@/components/pro/base/command-menu'
import { useFacetedFilter } from '../../hooks/use-faceted-filter'
import { facetedFilterContentClassName } from './classes'
import { getFacetedFilterCommandOptions } from './options'
import { FacetedFilterTrigger } from './trigger'
import type { FacetedFilterProps } from './types'

export type { FacetedFilterOption, FacetedFilterProps } from './types'

export function FacetedFilter({
  value,
  onChange,
  options,
  placeholder = 'Filter...',
  multiple = false,
  facets,
  className,
}: FacetedFilterProps) {
  const filter = useFacetedFilter({ value, multiple, onChange })
  const commandOptions = getFacetedFilterCommandOptions({
    options,
    selectedValues: filter.selectedValues,
    facets,
    onSelect: filter.select,
    onClear: filter.clear,
  })

  return (
    <ProCommandMenu
      contentClassName={facetedFilterContentClassName}
      searchable
      placeholder={placeholder}
      options={commandOptions}
      trigger={
        <FacetedFilterTrigger
          options={options}
          placeholder={placeholder}
          selectedValues={filter.selectedValues}
          className={className}
        />
      }
    />
  )
}
