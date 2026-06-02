import { cn } from '@/lib/utils'
import {
  FieldSelect,
  FieldSelectContent,
  FieldSelectItem,
  FieldSelectTrigger,
  FieldSelectValue,
} from '../shared/select'
import type { TimePartSelectProps } from './types'
import { padTimePart } from './utils'

export function TimePartSelect({
  value,
  options,
  disabled,
  triggerClassName,
  onChange,
}: TimePartSelectProps) {
  return (
    <FieldSelect
      value={String(value)}
      disabled={disabled}
      onValueChange={(next) => onChange(Number(next))}
    >
      <FieldSelectTrigger
        className={cn(
          'h-7 w-12 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0 dark:bg-transparent dark:hover:bg-transparent',
          triggerClassName,
        )}
      >
        <FieldSelectValue />
      </FieldSelectTrigger>
      <FieldSelectContent>
        {options.map((option) => (
          <FieldSelectItem key={option} value={String(option)}>
            {padTimePart(option)}
          </FieldSelectItem>
        ))}
      </FieldSelectContent>
    </FieldSelect>
  )
}
