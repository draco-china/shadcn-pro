'use client'

import { cn } from '@/lib/utils'
import { ProToolbarItemView } from './items'
import type { ProToolbarItem, ProToolbarProps } from './types'

export type {
  ProToolbarButtonItem,
  ProToolbarButtonSize,
  ProToolbarButtonVariant,
  ProToolbarContent,
  ProToolbarCustomItem,
  ProToolbarDropdownItem,
  ProToolbarItem,
  ProToolbarMenuItem,
  ProToolbarMenuOption,
  ProToolbarProps,
  ProToolbarRegion,
  ProToolbarSeparatorItem,
  ProToolbarState,
} from './types'

export function ProToolbar<TContext = unknown>({
  context,
  left,
  center,
  right,
  variant,
  size,
  className,
}: ProToolbarProps<TContext>) {
  const resolvedContext = context as TContext

  return (
    <div data-slot="pro-toolbar" className={cn('flex flex-wrap items-center gap-2', className)}>
      <ProToolbarRegionView
        options={left?.options}
        context={resolvedContext}
        variant={variant}
        size={size}
        className={cn('basis-full justify-start md:basis-auto', left?.className)}
      />
      <ProToolbarRegionView
        options={center?.options}
        context={resolvedContext}
        variant={variant}
        size={size}
        className={cn(
          'min-w-0 basis-full justify-center md:flex-1 md:basis-auto',
          center?.className,
        )}
      />
      <ProToolbarRegionView
        options={right?.options}
        context={resolvedContext}
        variant={variant}
        size={size}
        className={cn('basis-full justify-end md:ml-auto md:basis-auto', right?.className)}
      />
    </div>
  )
}

function ProToolbarRegionView<TContext>({
  options,
  context,
  variant,
  size,
  className,
}: {
  options?: ProToolbarItem<TContext>[]
  context: TContext
  variant?: ProToolbarProps<TContext>['variant']
  size?: ProToolbarProps<TContext>['size']
  className?: string
}) {
  const visibleOptions = options?.filter((item) => {
    const hidden = typeof item.hidden === 'function' ? item.hidden(context) : item.hidden
    return !hidden
  })
  const itemNodes = visibleOptions?.map((item) => (
    <ProToolbarItemView key={item.key} item={item} context={context} variant={variant} size={size} />
  ))

  if (!itemNodes?.length) return null

  return (
    <div
      data-slot="pro-toolbar-region"
      className={cn('flex w-full flex-wrap items-center gap-2 md:w-auto', className)}
    >
      {itemNodes}
    </div>
  )
}
