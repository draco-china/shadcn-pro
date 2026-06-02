'use client'

import type { ChangeEvent } from 'react'
import { Input } from '../input'
import { parseMoneyInput } from '../shared/number'
import type { MoneyProps } from './types'

export type { MoneyProps } from './types'

export function Money({
  value,
  onChange,
  currency = '$',
  precision = 2,
  placeholder = '0.00',
  disabled,
  className,
  prefix,
  ...props
}: MoneyProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(parseMoneyInput(e.target.value, precision))
  }

  return (
    <Input
      type="text"
      inputMode="decimal"
      value={value !== undefined ? String(value) : ''}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      prefix={prefix ?? currency}
      className={className}
      {...props}
    />
  )
}
