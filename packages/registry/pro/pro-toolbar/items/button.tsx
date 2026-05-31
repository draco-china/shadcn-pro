'use client'

import { ProButton } from '@/components/pro/pro-base'
import type { ProToolbarButtonItem } from '../types'
import { renderToolbarContent, resolveToolbarCopy } from './utils'

export function ToolbarButtonItem<TContext>({
  item,
  context,
}: {
  item: ProToolbarButtonItem<TContext>
  context: TContext
}) {
  const controlledLoading =
    typeof item.loading === 'function' ? item.loading(context) : item.loading
  const itemDisabled = typeof item.disabled === 'function' ? item.disabled(context) : item.disabled
  const label = renderToolbarContent(item.label, context)
  const icon = renderToolbarContent(item.icon, context)
  const tooltip = renderToolbarContent(item.tooltip, context)
  const copy = resolveToolbarCopy(item.copy, context)
  const itemSize = item.size ?? 'sm'
  const {
    key,
    label: _label,
    icon: _icon,
    tooltip: _tooltip,
    hidden,
    htmlType,
    disabled: _disabled,
    loading: _loading,
    copy: _copy,
    onClick,
    size: _size,
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

  return (
    <ProButton
      type={htmlType ?? 'button'}
      variant="outline"
      {...buttonProps}
      size={itemSize}
      icon={icon}
      tooltip={tooltip}
      copy={copy}
      loading={controlledLoading}
      disabled={itemDisabled}
      onClick={() => onClick?.(context)}
    >
      {label}
    </ProButton>
  )
}
