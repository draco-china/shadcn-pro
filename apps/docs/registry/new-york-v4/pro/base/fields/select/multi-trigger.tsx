import { ChevronDown } from 'lucide-react'
import type { MouseEvent } from 'react'
import { cn } from '@/lib/utils'
import type { FieldSize } from '../shared/field'
import { FieldTriggerButton } from '../shared/trigger'
import {
  selectChevronClassName,
  selectMultiPlaceholderClassName,
  selectMultiTriggerContentClassName,
  selectTriggerClassName,
} from './classes'
import type { SelectOption } from './types'
import { getSelectedLabel, SelectClearControl } from './utils'

interface MultiSelectTriggerProps {
  selectedOptions: SelectOption[]
  placeholder?: string
  maxTagCount: number
  disabled?: boolean
  showClear?: boolean
  open?: boolean
  size?: FieldSize
  triggerClassName?: string
  onClear: (event: MouseEvent<HTMLButtonElement>) => void
}

export function MultiSelectTrigger({
  selectedOptions,
  placeholder,
  maxTagCount,
  disabled,
  showClear,
  open,
  size,
  triggerClassName,
  onClear,
}: MultiSelectTriggerProps) {
  return (
    <FieldTriggerButton
      size={size}
      role="combobox"
      aria-expanded={open}
      disabled={disabled}
      className={cn(
        selectTriggerClassName,
        !selectedOptions.length && selectMultiPlaceholderClassName,
        triggerClassName,
      )}
    >
      <span className={selectMultiTriggerContentClassName}>
        {getSelectedLabel(selectedOptions, placeholder, maxTagCount)}
      </span>
      {showClear && <SelectClearControl onClear={onClear} />}
      <ChevronDown className={selectChevronClassName} />
    </FieldTriggerButton>
  )
}
