'use client'

import * as React from 'react'
import { Checkbox as ShadcnCheckbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export interface CheckboxBaseProps
  extends Omit<
    React.ComponentProps<typeof ShadcnCheckbox>,
    'value' | 'defaultValue' | 'onChange' | 'checked' | 'defaultChecked' | 'onCheckedChange'
  > {
  value?: boolean | string[]
  defaultValue?: boolean | string[]
  onChange?: (checked: boolean | string[]) => void
  options?: CheckboxOption[]
  children?: React.ReactNode
  labelClassName?: string
  itemClassName?: string
}

export interface CheckboxOption {
  label: React.ReactNode
  value: string
  description?: React.ReactNode
  disabled?: boolean
}

export function Checkbox({
  value,
  defaultValue,
  onChange,
  options,
  disabled,
  children,
  labelClassName,
  itemClassName,
  ...props
}: CheckboxBaseProps) {
  const generatedId = React.useId()
  const checkboxId = props.id ?? generatedId
  const isGroup = Boolean(options?.length)
  const isGroupControlled = Array.isArray(value)
  const selectedValues = Array.isArray(value) ? value : undefined
  const defaultSelectedValues = Array.isArray(defaultValue) ? defaultValue : undefined
  const [internalValues, setInternalValues] = React.useState<string[]>(defaultSelectedValues ?? [])
  const currentValues = isGroupControlled ? selectedValues : internalValues

  if (isGroup) {
    return (
      <div className="flex flex-col gap-2">
        {options?.map((option, index) => {
          const itemId = `${checkboxId}-${index}`
          const checked = currentValues?.includes(option.value)
          const itemDisabled = disabled || option.disabled

          return (
            <div key={option.value} className={cn('flex items-start gap-2', itemClassName)}>
              <ShadcnCheckbox
                id={itemId}
                checked={checked}
                disabled={itemDisabled}
                onCheckedChange={(nextChecked) => {
                  const current = currentValues ?? []
                  const next =
                    nextChecked === true
                      ? Array.from(new Set([...current, option.value]))
                      : current.filter((item) => item !== option.value)
                  if (!isGroupControlled) setInternalValues(next)
                  onChange?.(next)
                }}
                {...props}
              />
              <Label
                htmlFor={itemId}
                className={cn(
                  'grid gap-1 font-normal leading-none',
                  itemDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
                  labelClassName,
                )}
              >
                <span>{option.label}</span>
                {option.description && (
                  <span className="text-xs leading-snug text-muted-foreground">
                    {option.description}
                  </span>
                )}
              </Label>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex items-start gap-2">
      <ShadcnCheckbox
        id={checkboxId}
        checked={typeof value === 'boolean' ? value : undefined}
        defaultChecked={typeof defaultValue === 'boolean' ? defaultValue : undefined}
        onCheckedChange={(checked) => onChange?.(checked === true)}
        disabled={disabled}
        {...props}
      />
      {children && (
        <Label
          htmlFor={checkboxId}
          className={cn(
            'font-normal leading-none',
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
