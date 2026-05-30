'use client'

import * as React from 'react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

export interface RadioOption {
  label: string
  value: string
  disabled?: boolean
}

export interface RadioProps
  extends Omit<
    React.ComponentProps<typeof RadioGroup>,
    'value' | 'defaultValue' | 'onChange' | 'onValueChange' | 'disabled'
  > {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  options?: RadioOption[]
  itemClassName?: string
  labelClassName?: string
}

export function Radio({
  value,
  defaultValue,
  onChange,
  disabled,
  options = [],
  className,
  itemClassName,
  labelClassName,
  ...props
}: RadioProps) {
  const generatedId = React.useId()

  return (
    <RadioGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={(nextValue) => onChange?.(nextValue)}
      disabled={disabled}
      className={cn('flex flex-col gap-2', className)}
      {...props}
    >
      {options.map((opt, index) => {
        const itemId = `${generatedId}-${index}`

        return (
          <div key={opt.value} className={cn('flex items-center gap-2', itemClassName)}>
            <RadioGroupItem value={opt.value} id={itemId} disabled={opt.disabled} />
            <Label htmlFor={itemId} className={cn('cursor-pointer font-normal', labelClassName)}>
              {opt.label}
            </Label>
          </div>
        )
      })}
    </RadioGroup>
  )
}
