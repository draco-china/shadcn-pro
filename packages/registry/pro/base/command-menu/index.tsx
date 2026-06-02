'use client'

import { Command as CommandPrimitive } from 'cmdk'
import { SearchIcon } from 'lucide-react'
import { Popover as PopoverPrimitive } from 'radix-ui'
import { Fragment } from 'react'
import { cn } from '@/lib/utils'
import { isRenderableNode } from '../utils/react-node'
import {
  commandMenuContentClassName,
  commandMenuEmptyClassName,
  commandMenuGroupClassName,
  commandMenuItemClassName,
  commandMenuListClassName,
  commandMenuRootClassName,
  commandMenuSearchClassName,
  commandMenuSearchIconClassName,
  commandMenuSearchInputClassName,
  commandMenuSeparatorClassName,
} from './classes'
import type { ProCommandMenuProps } from './types'

export type { ProCommandMenuOption, ProCommandMenuProps } from './types'

export function ProCommandMenu({
  open,
  onOpenChange,
  trigger,
  contentClassName,
  searchable,
  placeholder,
  emptyText,
  options,
}: ProCommandMenuProps) {
  return (
    <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className={cn(commandMenuContentClassName, contentClassName)}
        >
          <CommandPrimitive className={commandMenuRootClassName}>
            {searchable && (
              <div className={commandMenuSearchClassName}>
                <SearchIcon className={commandMenuSearchIconClassName} />
                <CommandPrimitive.Input
                  placeholder={placeholder ?? 'Search...'}
                  className={commandMenuSearchInputClassName}
                />
              </div>
            )}
            <CommandPrimitive.List className={commandMenuListClassName}>
              <CommandPrimitive.Empty className={commandMenuEmptyClassName}>
                {emptyText ?? 'No results found.'}
              </CommandPrimitive.Empty>
              <CommandPrimitive.Group className={commandMenuGroupClassName}>
                {options.map((option) => (
                  <Fragment key={option.key}>
                    {(option.separator === 'left' || option.separator === 'both') && (
                      <CommandPrimitive.Separator className={commandMenuSeparatorClassName} />
                    )}
                    <CommandPrimitive.Item
                      value={option.value ?? option.key}
                      disabled={option.disabled}
                      onSelect={option.onSelect}
                      className={cn(commandMenuItemClassName, option.className)}
                    >
                      {option.indicator}
                      {option.icon}
                      {isRenderableNode(option.label) && <span>{option.label}</span>}
                      {option.suffix}
                    </CommandPrimitive.Item>
                    {(option.separator === 'right' || option.separator === 'both') && (
                      <CommandPrimitive.Separator className={commandMenuSeparatorClassName} />
                    )}
                  </Fragment>
                ))}
              </CommandPrimitive.Group>
            </CommandPrimitive.List>
          </CommandPrimitive>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
