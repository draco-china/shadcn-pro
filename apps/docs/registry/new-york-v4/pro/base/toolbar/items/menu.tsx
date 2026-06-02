'use client'

import { ChevronDown } from 'lucide-react'

import { ProButton } from '@/components/pro/base/button'
import { ProDropdownMenu } from '@/components/pro/base/dropdown-menu'
import { isRenderableNode } from '@/components/pro/base/utils/react-node'
import { toolbarMenuChevronClassName } from '../classes'
import type { ProToolbarButtonSize, ProToolbarButtonVariant, ProToolbarMenuItem } from '../types'
import { renderToolbarContent, resolveToolbarState } from './utils'

export function ToolbarMenuItem<TContext>({
  item,
  context,
  variant,
  size,
}: {
  item: ProToolbarMenuItem<TContext>
  context: TContext
  variant?: ProToolbarButtonVariant
  size?: ProToolbarButtonSize
}) {
  const label = renderToolbarContent(item.label, context)
  const icon = renderToolbarContent(item.icon, context)
  const tooltip = renderToolbarContent(item.tooltip, context)
  const iconOnly = isRenderableNode(icon) && !isRenderableNode(label)
  const options = typeof item.items === 'function' ? item.items(context) : item.items
  const menuOptions = options
    .filter((option) => !resolveToolbarState(option.hidden, context))
    .map((option) => ({
      key: option.key,
      label: renderToolbarContent(option.label, context),
      icon: renderToolbarContent(option.icon, context),
      shortcut: renderToolbarContent(option.shortcut, context),
      disabled: resolveToolbarState(option.disabled, context),
      loading: resolveToolbarState(option.loading, context),
      danger: resolveToolbarState(option.danger, context),
      separator: option.separator,
      onSelect: option.onClick ? () => option.onClick?.(context) : undefined,
    }))

  const trigger = (
    <ProButton
      type="button"
      variant={item.variant ?? variant}
      size={item.size ?? size}
      prefix={icon}
      loading={resolveToolbarState(item.loading, context)}
      disabled={resolveToolbarState(item.disabled, context)}
      className={item.className}
      title={item.title}
      aria-label={item['aria-label']}
    >
      {label}
      {!iconOnly && <ChevronDown className={toolbarMenuChevronClassName} />}
    </ProButton>
  )
  return <ProDropdownMenu trigger={trigger} tooltip={tooltip} options={menuOptions} />
}
