'use client'

import { cn } from '@/lib/utils'
import { ProToolbarItemView } from './items'
import type { ProToolbarItem, ProToolbarProps } from './types'

export type {
  ProToolbarButtonItem,
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
  className,
}: ProToolbarProps<TContext>) {
  const resolvedContext = context as TContext

  return (
    <div data-slot="pro-toolbar" className={cn('flex flex-wrap items-center gap-2', className)}>
      <ProToolbarRegionView
        options={left?.options}
        context={resolvedContext}
        className={cn('basis-full justify-start md:basis-auto', left?.className)}
      />
      <ProToolbarRegionView
        options={center?.options}
        context={resolvedContext}
        className={cn(
          'min-w-0 basis-full justify-center md:flex-1 md:basis-auto',
          center?.className,
        )}
      />
      <ProToolbarRegionView
        options={right?.options}
        context={resolvedContext}
        className={cn('basis-full justify-end md:ml-auto md:basis-auto', right?.className)}
      />
    </div>
  )
}

function ProToolbarRegionView<TContext>({
  options,
  context,
  className,
}: {
  options?: ProToolbarItem<TContext>[]
  context: TContext
  className?: string
}) {
  const itemNodes = options?.map((item) => (
    <ProToolbarItemView key={item.key} item={item} context={context} />
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
