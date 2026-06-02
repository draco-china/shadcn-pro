'use client'

import { cn } from '@/lib/utils'
import {
  toolbarCenterRegionClassName,
  toolbarLeftRegionClassName,
  toolbarRightRegionClassName,
  toolbarRootClassName,
} from './classes'
import { ProToolbarRegionView } from './region'
import type { ProToolbarProps } from './types'

export type {
  ProToolbarButtonItem,
  ProToolbarButtonSize,
  ProToolbarButtonVariant,
  ProToolbarContent,
  ProToolbarCustomItem,
  ProToolbarItem,
  ProToolbarMenuItem,
  ProToolbarMenuOption,
  ProToolbarProps,
  ProToolbarRegion,
  ProToolbarSeparatorItem,
  ProToolbarState,
} from './types'

export function ProToolbar<TContext = undefined>({
  context,
  left,
  center,
  right,
  variant,
  size,
  className,
}: ProToolbarProps<TContext>) {
  const toolbarContext = context as TContext

  return (
    <div data-slot="pro-toolbar" className={cn(toolbarRootClassName, className)}>
      <ProToolbarRegionView
        region={left}
        context={toolbarContext}
        variant={variant}
        size={size}
        className={toolbarLeftRegionClassName}
      />
      <ProToolbarRegionView
        region={center}
        context={toolbarContext}
        variant={variant}
        size={size}
        className={toolbarCenterRegionClassName}
      />
      <ProToolbarRegionView
        region={right}
        context={toolbarContext}
        variant={variant}
        size={size}
        className={toolbarRightRegionClassName}
      />
    </div>
  )
}
