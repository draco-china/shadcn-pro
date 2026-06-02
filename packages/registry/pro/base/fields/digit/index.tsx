'use client'

import type { ChangeEvent } from 'react'
import { Input } from '../input'
import { isValidNumber, parseNumberInput } from '../shared/number'
import type { DigitProps } from './types'

export type { DigitProps } from './types'

export function Digit({
  value,
  onChange,
  placeholder = 'Enter number',
  disabled,
  className,
  allowClear = true,
  min,
  max,
  step = 1,
  ...props
}: DigitProps) {
  const hasValue = isValidNumber(value)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(parseNumberInput(e.target.value))
  }

  function handleClear() {
    onChange?.(undefined)
  }

  return (
    <Input
      {...props}
      type="number"
      value={hasValue ? value : ''}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      min={min}
      max={max}
      step={step}
      className={className}
      allowClear={allowClear}
      onClear={handleClear}
    />
  )
}
