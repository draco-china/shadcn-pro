'use client'

import { Separator } from '@/components/ui/separator'
import type { ProToolbarDropdownItem, ProToolbarItem, ProToolbarMenuItem } from '../types'
import { ToolbarButtonItem } from './button'
import { ToolbarDropdownItem } from './dropdown'
import { ToolbarMenuItem } from './menu'

export function ProToolbarItemView<TContext>({
  item,
  context,
}: {
  item: ProToolbarItem<TContext>
  context: TContext
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

  if (isToolbarDropdownItem(item)) return <ToolbarDropdownItem item={item} context={context} />
  if (isToolbarMenuItem(item)) return <ToolbarMenuItem item={item} context={context} />
  return <ToolbarButtonItem item={item} context={context} />
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
