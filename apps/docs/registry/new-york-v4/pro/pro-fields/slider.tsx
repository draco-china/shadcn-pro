'use client'

import type * as React from 'react'
import { Slider as ShadcnSlider } from '@/components/ui/slider'

export interface SliderProps
  extends Omit<
    React.ComponentProps<typeof ShadcnSlider>,
    'value' | 'defaultValue' | 'onChange' | 'onValueChange'
  > {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  showValue?: boolean
  wrapperClassName?: string
}

export function Slider({
  value,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  showValue = false,
  className,
  wrapperClassName,
  ...props
}: SliderProps) {
  const displayValue = value ?? defaultValue ?? min

  return (
    <div className={wrapperClassName ?? 'flex items-center gap-3'}>
      <ShadcnSlider
        value={value !== undefined ? [value] : undefined}
        defaultValue={value === undefined ? [displayValue] : undefined}
        onValueChange={(vals) => onChange?.(vals[0])}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={className}
        {...props}
      />
      {showValue && (
        <span className="w-10 shrink-0 text-right text-sm text-muted-foreground">
          {displayValue}
        </span>
      )}
    </div>
  )
}

