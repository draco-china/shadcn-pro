'use client'

import { LoaderCircle } from 'lucide-react'
import { DropdownMenu as DropdownMenuPrimitive, Tooltip as TooltipPrimitive } from 'radix-ui'
import { Fragment } from 'react'
import { isRenderableNode } from '../utils/react-node'
import {
  dropdownMenuContentClassName,
  dropdownMenuItemClassName,
  dropdownMenuLoadingIconClassName,
  dropdownMenuSeparatorClassName,
  dropdownMenuShortcutClassName,
  dropdownMenuTooltipArrowClassName,
  dropdownMenuTooltipContentClassName,
} from './classes'
import type { ProDropdownMenuProps } from './types'

export type { ProDropdownMenuOption, ProDropdownMenuProps } from './types'

export function ProDropdownMenu({ trigger, tooltip, options }: ProDropdownMenuProps) {
  const hasTooltip = isRenderableNode(tooltip)

  return (
    <DropdownMenuPrimitive.Root>
      {hasTooltip ? (
        <TooltipPrimitive.Provider delayDuration={300}>
          <TooltipPrimitive.Root>
            <TooltipPrimitive.Trigger asChild>
              <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>
            </TooltipPrimitive.Trigger>
            <TooltipPrimitive.Portal>
              <TooltipPrimitive.Content
                sideOffset={0}
                className={dropdownMenuTooltipContentClassName}
              >
                {tooltip}
                <TooltipPrimitive.Arrow className={dropdownMenuTooltipArrowClassName} />
              </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
          </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
      ) : (
        <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>
      )}
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          data-slot="pro-dropdown-menu-content"
          align="end"
          sideOffset={4}
          className={dropdownMenuContentClassName}
        >
          {options.map((option) => (
            <Fragment key={option.key}>
              {(option.separator === 'left' || option.separator === 'both') && (
                <DropdownMenuPrimitive.Separator className={dropdownMenuSeparatorClassName} />
              )}
              <DropdownMenuPrimitive.Item
                data-slot="pro-dropdown-menu-item"
                disabled={option.disabled || option.loading}
                data-variant={option.danger ? 'destructive' : 'default'}
                className={dropdownMenuItemClassName}
                onSelect={option.onSelect}
              >
                {option.loading ? (
                  <LoaderCircle className={dropdownMenuLoadingIconClassName} />
                ) : (
                  option.icon
                )}
                {isRenderableNode(option.label) && <span>{option.label}</span>}
                {isRenderableNode(option.shortcut) && (
                  <span className={dropdownMenuShortcutClassName}>{option.shortcut}</span>
                )}
              </DropdownMenuPrimitive.Item>
              {(option.separator === 'right' || option.separator === 'both') && (
                <DropdownMenuPrimitive.Separator className={dropdownMenuSeparatorClassName} />
              )}
            </Fragment>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}
