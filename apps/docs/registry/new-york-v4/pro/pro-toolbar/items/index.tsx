'use client'

import { Separator } from '@/registry/new-york-v4/ui/separator'
import type {
  ProToolbarButtonSize,
  ProToolbarButtonVariant,
  ProToolbarDropdownItem,
  ProToolbarItem,
  ProToolbarMenuItem,
} from '../types'
import { ToolbarButtonItem } from './button'
import { ToolbarDropdownItem } from './dropdown'
import { ToolbarMenuItem } from './menu'

export function ProToolbarItemView<TContext>({
  item,
  context,
  variant,
  size,
}: {
  item: ProToolbarItem<TContext>
  context: TContext
  variant?: ProToolbarButtonVariant
  size?: ProToolbarButtonSize
}) {
  if ('render' in item) {
    return item.render(context)
  }

  if ('separator' in item) {
    return (
      <Separator
        orientation="vertical"
        className="mx-1 hidden h-5 data-[orientation=vertical]:h-5 sm:block"
      />
    )
  }

  if (isToolbarDropdownItem(item)) {
    return <ToolbarDropdownItem item={item} context={context} variant={variant} size={size} />
  }
  if (isToolbarMenuItem(item)) {
    return <ToolbarMenuItem item={item} context={context} variant={variant} size={size} />
  }
  return <ToolbarButtonItem item={item} context={context} variant={variant} size={size} />
}

function isToolbarDropdownItem<TContext>(
  item: ProToolbarItem<TContext>,
): item is ProToolbarDropdownItem<TContext> {
  return 'content' in item && item.content !== undefined
}

function isToolbarMenuItem<TContext>(
  item: ProToolbarItem<TContext>,
): item is ProToolbarMenuItem<TContext> {
  return 'items' in item
}
