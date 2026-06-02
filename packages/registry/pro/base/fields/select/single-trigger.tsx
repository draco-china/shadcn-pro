import type { MouseEvent } from 'react'
import { cn } from '@/lib/utils'
import type { FieldSize } from '../shared/field'
import { FieldSelectTrigger, FieldSelectValue } from '../shared/select'
import {
  selectSingleTriggerContentClassName,
  selectSingleValueClassName,
  selectTriggerClassName,
} from './classes'
import type { SelectOption } from './types'
import { SelectClearControl } from './utils'

interface SingleSelectTriggerProps {
  selectedOption?: SelectOption
  hasValue: boolean
  placeholder?: string
  disabled?: boolean
  showClear?: boolean
  size?: FieldSize
  triggerClassName?: string
  onClear: (event: MouseEvent<HTMLButtonElement>) => void
}

export function SingleSelectTrigger({
  selectedOption,
  hasValue,
  placeholder,
  disabled,
  showClear,
  size,
  triggerClassName,
  onClear,
}: SingleSelectTriggerProps) {
  return (
    <FieldSelectTrigger
      size={size}
      disabled={disabled}
      hasValue={hasValue}
      className={cn(selectTriggerClassName, triggerClassName)}
    >
      <span className={selectSingleTriggerContentClassName}>
        <FieldSelectValue placeholder={placeholder ?? 'Select...'}>
          {hasValue ? (
            <span className={selectSingleValueClassName}>{selectedOption?.label}</span>
          ) : undefined}
        </FieldSelectValue>
      </span>
      {showClear && <SelectClearControl onClear={onClear} />}
    </FieldSelectTrigger>
  )
}
