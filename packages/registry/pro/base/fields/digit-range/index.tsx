'use client'

import type { ChangeEvent } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '../input'
import { isValidNumber, normalizeNumberRange, parseNumberInput } from '../shared/number'
import {
  digitRangeInputClassName,
  digitRangeRootClassName,
  digitRangeSeparatorClassName,
} from './classes'
import type { DigitRangeProps } from './types'

export type { DigitRangeProps, DigitRangeValue } from './types'

export function DigitRange({
  value,
  onChange,
  placeholder = ['Min', 'Max'],
  disabled,
  className,
  allowClear = true,
}: DigitRangeProps) {
  const hasValue = isValidNumber(value?.min) || isValidNumber(value?.max)

  function handleMinChange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(normalizeNumberRange({ ...value, min: parseNumberInput(e.target.value) }))
  }

  function handleMaxChange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(normalizeNumberRange({ ...value, max: parseNumberInput(e.target.value) }))
  }

  return (
    <div className={cn(digitRangeRootClassName, className)}>
      <Input
        type="number"
        value={value?.min ?? ''}
        onChange={handleMinChange}
        placeholder={placeholder[0]}
        disabled={disabled}
        className={digitRangeInputClassName}
        allowClear={false}
      />
      <span className={digitRangeSeparatorClassName}>~</span>
      <Input
        type="number"
        value={value?.max ?? ''}
        onChange={handleMaxChange}
        placeholder={placeholder[1]}
        disabled={disabled}
        className={digitRangeInputClassName}
        allowClear={allowClear && hasValue}
        onClear={() => onChange?.(undefined)}
      />
    </div>
  )
}
