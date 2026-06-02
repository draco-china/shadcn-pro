'use client'

import { Check } from 'lucide-react'
import type { ProCommandMenuOption } from '@/components/pro/base/command-menu'
import { cn } from '@/lib/utils'
import {
  facetedFilterCheckIconClassName,
  facetedFilterClearOptionClassName,
  facetedFilterCountClassName,
  facetedFilterIndicatorActiveClassName,
  facetedFilterIndicatorClassName,
  facetedFilterIndicatorInactiveClassName,
  facetedFilterOptionIconClassName,
} from './classes'
import type { FacetedFilterOption } from './types'

export interface GetFacetedFilterCommandOptionsProps {
  options?: FacetedFilterOption[]
  selectedValues: Set<string>
  facets?: Map<string, number>
  onSelect: (value: string) => void
  onClear: () => void
}

export function getFacetedFilterCommandOptions({
  options,
  selectedValues,
  facets,
  onSelect,
  onClear,
}: GetFacetedFilterCommandOptionsProps): ProCommandMenuOption[] {
  const commandOptions =
    options?.map((option) =>
      getFacetedFilterCommandOption({
        option,
        selected: selectedValues.has(option.value),
        count: facets?.get(option.value),
        onSelect,
      }),
    ) ?? []

  if (!selectedValues.size) return commandOptions

  return [
    ...commandOptions,
    {
      key: '__clear',
      label: 'Clear filters',
      separator: 'left',
      className: facetedFilterClearOptionClassName,
      onSelect: onClear,
    },
  ]
}

function getFacetedFilterCommandOption({
  option,
  selected,
  count,
  onSelect,
}: {
  option: FacetedFilterOption
  selected: boolean
  count?: number
  onSelect: (value: string) => void
}): ProCommandMenuOption {
  const Icon = option.icon

  return {
    key: option.value,
    value: option.value,
    indicator: <FacetedFilterCommandIndicator selected={selected} />,
    icon: Icon && <Icon className={facetedFilterOptionIconClassName} />,
    label: option.label,
    suffix: count !== undefined && <span className={facetedFilterCountClassName}>{count}</span>,
    onSelect: () => onSelect(option.value),
  }
}

function FacetedFilterCommandIndicator({ selected }: { selected: boolean }) {
  return (
    <div
      className={cn(
        facetedFilterIndicatorClassName,
        selected ? facetedFilterIndicatorActiveClassName : facetedFilterIndicatorInactiveClassName,
      )}
    >
      <Check className={facetedFilterCheckIconClassName} />
    </div>
  )
}
