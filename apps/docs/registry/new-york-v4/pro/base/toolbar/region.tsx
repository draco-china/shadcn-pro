'use client'

import { cn } from '@/lib/utils'
import { toolbarRegionClassName } from './classes'
import { ProToolbarItemView } from './items/item-view'
import type { ProToolbarProps } from './types'

export function ProToolbarRegionView<TContext>({
  region,
  context,
  variant,
  size,
  className,
}: {
  region?: ProToolbarProps<TContext>['left']
  context: TContext
  variant?: ProToolbarProps<TContext>['variant']
  size?: ProToolbarProps<TContext>['size']
  className?: string
}) {
  const visibleOptions = region?.options.filter((item) => {
    const hidden = typeof item.hidden === 'function' ? item.hidden(context) : item.hidden
    return !hidden
  })
  const itemNodes = visibleOptions?.map((item) => (
    <ProToolbarItemView
      key={item.key}
      item={item}
      context={context}
      variant={variant}
      size={size}
    />
  ))

  if (!itemNodes?.length) return null

  return (
    <div
      data-slot="pro-toolbar-region"
      className={cn(toolbarRegionClassName, className, region?.className)}
    >
      {itemNodes}
    </div>
  )
}
