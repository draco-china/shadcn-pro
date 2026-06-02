'use client'

import { ProSeparator } from '@/components/pro/base/separator'
import { toolbarSeparatorClassName } from '../classes'
import type {
  ProToolbarButtonSize,
  ProToolbarButtonVariant,
  ProToolbarItem,
  ProToolbarMenuItem,
} from '../types'
import { ToolbarButtonItem } from './button'
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
    return <ProSeparator orientation="vertical" className={toolbarSeparatorClassName} />
  }

  if (isToolbarMenuItem(item)) {
    return <ToolbarMenuItem item={item} context={context} variant={variant} size={size} />
  }
  return <ToolbarButtonItem item={item} context={context} variant={variant} size={size} />
}

function isToolbarMenuItem<TContext>(
  item: ProToolbarItem<TContext>,
): item is ProToolbarMenuItem<TContext> {
  return 'items' in item
}
