'use client'

import { ProButton } from '@/components/pro/pro-base'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type {
  ProToolbarButtonSize,
  ProToolbarButtonVariant,
  ProToolbarDropdownItem,
} from '../types'
import { renderToolbarContent, resolveToolbarCopy } from './utils'

export function ToolbarDropdownItem<TContext>({
  item,
  context,
  variant,
  size,
}: {
  item: ProToolbarDropdownItem<TContext>
  context: TContext
  variant?: ProToolbarButtonVariant
  size?: ProToolbarButtonSize
}) {
  const label = renderToolbarContent(item.label, context)
  const icon = renderToolbarContent(item.icon, context)
  const tooltip = renderToolbarContent(item.tooltip, context)
  const content = renderToolbarContent(item.content, context)
  const copy = resolveToolbarCopy(item.copy, context)
  const loading = typeof item.loading === 'function' ? item.loading(context) : item.loading
  const itemDisabled = typeof item.disabled === 'function' ? item.disabled(context) : item.disabled
  const iconOnly = Boolean(icon) && !label
  const itemSize = item.size ?? size
  const {
    key,
    label: _label,
    icon: _icon,
    tooltip: _tooltip,
    hidden,
    disabled: _disabled,
    loading: _loading,
    copy: _copy,
    size: _size,
    variant: itemVariant,
    content: _content,
    contentClassName,
    align = 'end',
    side = 'bottom',
    ...buttonProps
  } = item
  void key
  void _label
  void _icon
  void _tooltip
  void hidden
  void _disabled
  void _loading
  void _copy
  void _size
  void _content

  const trigger = (
    <ProButton
      type="button"
      {...buttonProps}
      variant={itemVariant ?? variant}
      size={itemSize}
      icon={icon}
      copy={copy}
      loading={loading}
      disabled={itemDisabled}
      aria-label={
        buttonProps['aria-label'] ?? (iconOnly && typeof tooltip === 'string' ? tooltip : undefined)
      }
    >
      {label}
    </ProButton>
  )

  return (
    <DropdownMenu>
      {tooltip ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      ) : (
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      )}
      <DropdownMenuContent align={align} side={side} className={cn(contentClassName)}>
        {content}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
