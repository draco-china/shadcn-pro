'use client'

import type * as React from 'react'
import { Input } from './input'

export interface MoneyProps
  extends Omit<
    React.ComponentProps<typeof Input>,
    'value' | 'defaultValue' | 'onChange' | 'prefix'
  > {
  value?: number
  onChange?: (value: number | undefined) => void
  currency?: string
  precision?: number
}

export function Money({
  value,
  onChange,
  currency = '$',
  precision = 2,
  placeholder = '0.00',
  disabled,
  className,
  ...props
}: MoneyProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value.replace(/[^0-9.]/g, '')
    const num = parseFloat(v)
    onChange?.(Number.isNaN(num) ? undefined : num)
  }

  return (
    <Input
      type="text"
      inputMode="decimal"
      value={value !== undefined ? String(value) : ''}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      prefix={currency}
      className={className}
      {...props}
    />
  )
}
