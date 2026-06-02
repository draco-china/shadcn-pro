'use client'

import { ChevronDownIcon } from 'lucide-react'
import { Select as SelectPrimitive } from 'radix-ui'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { type FieldSize, fieldTriggerClassName } from './field'
import { fieldSelectIconClassName, fieldSelectTriggerValueClassName } from './select-classes'

export type { FieldSelectContentProps } from './select-content'
export { FieldSelectContent } from './select-content'
export type { FieldSelectItemProps } from './select-item'
export { FieldSelectItem } from './select-item'

export interface FieldSelectProps {
  value?: string
  defaultValue?: string
  disabled?: boolean
  required?: boolean
  children?: ReactNode
  onValueChange?: (value: string) => void
}

export function FieldSelect(props: FieldSelectProps) {
  return <SelectPrimitive.Root data-slot="field-select" {...props} />
}

export interface FieldSelectTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'value'> {
  children?: ReactNode
  size?: FieldSize
  hasValue?: boolean
}

export function FieldSelectTrigger({
  className,
  children,
  size = 'default',
  hasValue = true,
  ...props
}: FieldSelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="field-select-trigger"
      data-size={size}
      className={cn(
        fieldTriggerClassName,
        !hasValue && 'text-muted-foreground',
        fieldSelectTriggerValueClassName,
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className={fieldSelectIconClassName} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

export interface FieldSelectValueProps {
  placeholder?: ReactNode
  children?: ReactNode
}

export function FieldSelectValue(props: FieldSelectValueProps) {
  return <SelectPrimitive.Value data-slot="field-select-value" {...props} />
}
