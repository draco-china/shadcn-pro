'use client'

import * as React from 'react'
import { Checkbox as ShadcnCheckbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export interface CheckboxBaseProps
  extends Omit<
    React.ComponentProps<typeof Checkbox>,
    'value' | 'defaultValue' | 'onChange' | 'checked' | 'defaultChecked' | 'onCheckedChange'
  > {
  value?: boolean
  defaultValue?: boolean
  onChange?: (checked: boolean) => void
  children?: React.ReactNode
  labelClassName?: string
}

export function Checkbox({
  value,
  defaultValue,
  onChange,
  disabled,
  children,
  labelClassName,
  ...props
}: CheckboxBaseProps) {
  const generatedId = React.useId()
  const checkboxId = props.id ?? generatedId

  return (
    <div className="flex items-center gap-2">
      <ShadcnCheckbox
        id={checkboxId}
        checked={value}
        defaultChecked={defaultValue}
        onCheckedChange={(checked) => onChange?.(checked === true)}
        disabled={disabled}
        {...props}
      />
      {children && (
        <Label
          htmlFor={checkboxId}
          className={cn(
            'font-normal',
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            labelClassName,
          )}
        >
          {children}
        </Label>
      )}
    </div>
  )
}
