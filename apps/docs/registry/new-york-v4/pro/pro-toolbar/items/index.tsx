'use client'

import type * as React from 'react'

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
  const hidden = typeof item.hidden === 'function' ? item.hidden(context) : item.hidden
  if (hidden) return null

  let defaultNode: React.ReactNode
  if ('render' in item) {
    defaultNode = item.render(context)
  } else if ('separator' in item) {
    defaultNode = (
      <Separator
        orientation="vertical"
        className="mx-1 hidden h-5 data-[orientation=vertical]:h-5 sm:block"
      />
    )
  } else if (isToolbarDropdownItem(item)) {
    defaultNode = <ToolbarDropdownItem item={item} context={context} />
  } else if (isToolbarMenuItem(item)) {
    defaultNode = <ToolbarMenuItem item={item} context={context} />
  } else {
    defaultNode = <ToolbarButtonItem item={item} context={context} />
  }

  return defaultNode
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
