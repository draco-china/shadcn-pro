'use client'

import { RadioGroup as RadioGroupPrimitive } from 'radix-ui'
import { useId } from 'react'
import { cn } from '@/lib/utils'
import { radioGroupClassName } from './classes'
import { RadioItem } from './item'
import type { RadioProps } from './types'

export type { RadioOption, RadioProps } from './types'

export function Radio({
  value,
  defaultValue,
  onChange,
  disabled,
  options,
  className,
  itemClassName,
  labelClassName,
  name,
  required,
}: RadioProps) {
  const generatedId = useId()

  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      value={value}
      defaultValue={defaultValue}
      onValueChange={(nextValue) => onChange?.(nextValue)}
      disabled={disabled}
      name={name}
      required={required}
      className={cn(radioGroupClassName, className)}
    >
      {options?.map((opt, index) => {
        const itemId = `${generatedId}-${index}`

        return (
          <RadioItem
            key={opt.value}
            option={opt}
            id={itemId}
            disabled={disabled}
            itemClassName={itemClassName}
            labelClassName={labelClassName}
          />
        )
      })}
    </RadioGroupPrimitive.Root>
  )
}
