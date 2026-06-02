import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  selectCommandIndicatorClassName,
  selectCommandIndicatorHiddenClassName,
  selectCommandIndicatorVisibleClassName,
} from './classes'
import type { SelectOption } from './types'
import { SelectOptionContent } from './utils'

export function getSelectCommandOptions({
  options,
  selectedValues,
  onSelect,
}: {
  options?: SelectOption[]
  selectedValues: string[]
  onSelect: (value: string) => void
}) {
  return (
    options?.map((option) => {
      const selected = selectedValues.includes(option.value)

      return {
        key: option.value,
        value: option.value,
        disabled: option.disabled,
        indicator: (
          <Check
            className={cn(
              selectCommandIndicatorClassName,
              selected
                ? selectCommandIndicatorVisibleClassName
                : selectCommandIndicatorHiddenClassName,
            )}
          />
        ),
        label: <SelectOptionContent option={option} />,
        onSelect: () => onSelect(option.value),
      }
    }) ?? []
  )
}
