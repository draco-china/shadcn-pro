'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SegmentedOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SegmentedProps extends Omit<React.ComponentProps<'div'>, 'value' | 'onChange'> {
  value?: string
  onChange?: (value: string) => void
  options?: SegmentedOption[]
  disabled?: boolean
}

export function Segmented({
  value,
  onChange,
  options = [],
  disabled,
  className,
  ...props
}: SegmentedProps) {
  const id = React.useId()
  return (
    <div
      className={cn(
        'inline-flex rounded-md border bg-muted p-1 text-muted-foreground',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
      role="radiogroup"
      {...props}
    >
      {options.map((opt) => (
        <label key={opt.value} className="cursor-pointer">
          <input
            type="radio"
            name={id}
            value={opt.value}
            checked={value === opt.value}
            disabled={disabled ?? opt.disabled}
            aria-label={opt.label}
            className="sr-only"
            onChange={() => !disabled && !opt.disabled && onChange?.(opt.value)}
          />
          <span
            className={cn(
              'inline-flex items-center justify-center rounded-sm px-3 py-1 text-sm font-medium transition-all',
              'focus-visible:outline-none',
              (disabled ?? opt.disabled) && 'cursor-not-allowed',
              value === opt.value
                ? 'bg-background text-foreground shadow-sm'
                : 'hover:text-foreground',
            )}
          >
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  )
}

