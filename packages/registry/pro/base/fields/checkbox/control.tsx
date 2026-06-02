'use client'

import { CheckIcon } from 'lucide-react'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'
import {
  checkboxControlClassName,
  checkboxIndicatorClassName,
  checkboxIndicatorIconClassName,
} from './classes'
import type { CheckboxControlProps } from './types'

export function CheckboxControl({ className, ...props }: CheckboxControlProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(checkboxControlClassName, className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={checkboxIndicatorClassName}
      >
        <CheckIcon className={checkboxIndicatorIconClassName} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
