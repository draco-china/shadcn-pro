import { cn } from '@/lib/utils'
import {
  FieldSelect,
  FieldSelectContent,
  FieldSelectItem,
  FieldSelectTrigger,
  FieldSelectValue,
} from '../shared/select'
import type { AffixConfig } from './affix-types'

export function AffixSelect({
  affixSelect,
  side,
  selectedValue,
  disabled,
  onChange,
}: {
  affixSelect: AffixConfig
  side: 'prefix' | 'suffix'
  selectedValue: string
  disabled?: boolean
  onChange: (value: string, affixSelect: AffixConfig, side: 'prefix' | 'suffix') => void
}) {
  return (
    <FieldSelect
      value={selectedValue}
      disabled={disabled}
      onValueChange={(value) => onChange(value, affixSelect, side)}
    >
      <FieldSelectTrigger
        aria-label={affixSelect.ariaLabel ?? (side === 'prefix' ? 'Prefix' : 'Suffix')}
        className={cn(
          'h-7 w-auto shrink-0 gap-1 rounded-sm border-0 bg-transparent px-1 py-0 text-muted-foreground shadow-none',
          'focus-visible:ring-0 dark:bg-transparent dark:hover:bg-transparent',
          side === 'prefix' ? '-ml-1' : '-mr-1',
          affixSelect.className,
        )}
      >
        <FieldSelectValue />
      </FieldSelectTrigger>
      <FieldSelectContent align={side === 'prefix' ? 'start' : 'end'}>
        {affixSelect.options.map((option) => (
          <FieldSelectItem key={option.value} value={option.value}>
            {option.label}
          </FieldSelectItem>
        ))}
      </FieldSelectContent>
    </FieldSelect>
  )
}
