'use client'

import { CheckIcon } from 'lucide-react'
import { Select as SelectPrimitive } from 'radix-ui'
import type { ReactNode } from 'react'
import {
  fieldSelectItemClassName,
  fieldSelectItemIndicatorClassName,
  fieldSelectItemIndicatorIconClassName,
} from './select-classes'

export interface FieldSelectItemProps {
  value: string
  disabled?: boolean
  children?: ReactNode
}

export function FieldSelectItem({ children, ...props }: FieldSelectItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="field-select-item"
      className={fieldSelectItemClassName}
      {...props}
    >
      <span data-slot="field-select-item-indicator" className={fieldSelectItemIndicatorClassName}>
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className={fieldSelectItemIndicatorIconClassName} />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}
