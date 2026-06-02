'use client'

import { Popover as PopoverPrimitive } from 'radix-ui'
import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { fieldPopoverContentClassName } from './classes'

export interface FieldPopoverProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: ReactNode
}

export function FieldPopover(props: FieldPopoverProps) {
  return <PopoverPrimitive.Root data-slot="field-popover" {...props} />
}

export interface FieldPopoverTriggerProps {
  asChild?: boolean
  children?: ReactNode
}

export function FieldPopoverTriggerRoot(props: FieldPopoverTriggerProps) {
  return <PopoverPrimitive.Trigger data-slot="field-popover-trigger" {...props} />
}

export interface FieldPopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}

export function FieldPopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: FieldPopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="field-popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(fieldPopoverContentClassName, className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}
