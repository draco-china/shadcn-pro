'use client'

import { Slider as SliderPrimitive } from 'radix-ui'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  sliderRangeClassName,
  sliderRootClassName,
  sliderThumbClassName,
  sliderTrackClassName,
  sliderValueClassName,
  sliderWrapperClassName,
} from './classes'
import type { SliderProps } from './types'

export type { SliderProps } from './types'

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
  const [currentValue, setCurrentValue] = useState(defaultValue ?? min)
  const displayValue = value ?? currentValue

  function handleValueChange(nextValue: number[]) {
    const firstValue = nextValue[0] ?? min
    setCurrentValue(firstValue)
    onChange?.(firstValue)
  }

  return (
    <div className={wrapperClassName ?? sliderWrapperClassName}>
      <SliderPrimitive.Root
        data-slot="slider"
        value={value !== undefined ? [value] : undefined}
        defaultValue={value === undefined ? [currentValue] : undefined}
        onValueChange={handleValueChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={cn(sliderRootClassName, className)}
        {...props}
      >
        <SliderPrimitive.Track data-slot="slider-track" className={sliderTrackClassName}>
          <SliderPrimitive.Range data-slot="slider-range" className={sliderRangeClassName} />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb data-slot="slider-thumb" className={sliderThumbClassName} />
      </SliderPrimitive.Root>
      {showValue && <span className={sliderValueClassName}>{displayValue}</span>}
    </div>
  )
}
