'use client'

import { ProButton } from '@/components/pro/pro-base'
import type { ProToolbarButtonItem, ProToolbarButtonSize, ProToolbarButtonVariant } from '../types'
import { renderToolbarContent, resolveToolbarCopy } from './utils'

export function ToolbarButtonItem<TContext>({
  item,
  context,
  variant,
  size,
}: {
  item: ProToolbarButtonItem<TContext>
  context: TContext
  variant?: ProToolbarButtonVariant
  size?: ProToolbarButtonSize
}) {
  const controlledLoading =
    typeof item.loading === 'function' ? item.loading(context) : item.loading
  const itemDisabled = typeof item.disabled === 'function' ? item.disabled(context) : item.disabled
  const label = renderToolbarContent(item.label, context)
  const icon = renderToolbarContent(item.icon, context)
  const tooltip = renderToolbarContent(item.tooltip, context)
  const copy = resolveToolbarCopy(item.copy, context)
  const itemSize = item.size ?? size
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
    variant: itemVariant,
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
      {...buttonProps}
      variant={itemVariant ?? variant}
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
