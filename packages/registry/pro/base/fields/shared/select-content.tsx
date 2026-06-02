'use client'

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { Select as SelectPrimitive } from 'radix-ui'
import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import {
  fieldSelectContentClassName,
  fieldSelectPopperContentClassName,
  fieldSelectPopperViewportClassName,
  fieldSelectScrollButtonClassName,
  fieldSelectScrollIconClassName,
  fieldSelectViewportClassName,
} from './select-classes'

export interface FieldSelectContentProps extends HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  position?: 'item-aligned' | 'popper'
  sideOffset?: number
}

export function FieldSelectContent({
  className,
  children,
  position = 'item-aligned',
  align = 'center',
  side,
  sideOffset,
}: FieldSelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="field-select-content"
        position={position}
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn(
          fieldSelectContentClassName,
          position === 'popper' && fieldSelectPopperContentClassName,
          className,
        )}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            fieldSelectViewportClassName,
            position === 'popper' && fieldSelectPopperViewportClassName,
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectScrollUpButton() {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="field-select-scroll-up-button"
      className={fieldSelectScrollButtonClassName}
    >
      <ChevronUpIcon className={fieldSelectScrollIconClassName} />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton() {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="field-select-scroll-down-button"
      className={fieldSelectScrollButtonClassName}
    >
      <ChevronDownIcon className={fieldSelectScrollIconClassName} />
    </SelectPrimitive.ScrollDownButton>
  )
}
