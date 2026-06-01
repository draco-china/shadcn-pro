'use client'

import { ChevronDown, LoaderCircle } from 'lucide-react'
import * as React from 'react'

import { ProButton } from '@/registry/new-york-v4/pro/pro-base'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/registry/new-york-v4/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/new-york-v4/ui/tooltip'
import type {
  ProToolbarButtonSize,
  ProToolbarButtonVariant,
  ProToolbarMenuItem,
  ProToolbarMenuOption,
} from '../types'
import { renderToolbarContent, resolveToolbarCopy } from './utils'

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
  const copy = resolveToolbarCopy(item.copy, context)
  const loading = typeof item.loading === 'function' ? item.loading(context) : item.loading
  const itemDisabled = typeof item.disabled === 'function' ? item.disabled(context) : item.disabled
  const iconOnly = Boolean(icon) && !label
  const itemSize = item.size ?? size
  const options = typeof item.items === 'function' ? item.items(context) : item.items
  const {
    key,
    label: _label,
    icon: _icon,
    tooltip: _tooltip,
    hidden,
    disabled: _disabled,
    loading: _loading,
    copy: _copy,
    items,
    size: _size,
    variant: itemVariant,
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
  void items
  void _size

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
      {!iconOnly && <ChevronDown className="size-4" />}
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
      <DropdownMenuContent align={align} side={side}>
        {options
          .filter((option) => {
            const hidden =
              typeof option.hidden === 'function' ? option.hidden(context) : option.hidden
            return !hidden
          })
          .map((option) => (
            <ToolbarMenuOption key={option.key} option={option} context={context} />
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ToolbarMenuOption<TContext>({
  option,
  context,
}: {
  option: ProToolbarMenuOption<TContext>
  context: TContext
}) {
  const [pending, setPending] = React.useState(false)
  const label = renderToolbarContent(option.label, context)
  const icon = renderToolbarContent(option.icon, context)
  const shortcut = renderToolbarContent(option.shortcut, context)
  const optionLoading =
    typeof option.loading === 'function' ? option.loading(context) : option.loading
  const loading = pending || optionLoading
  const optionDisabled =
    typeof option.disabled === 'function' ? option.disabled(context) : option.disabled
  const disabled = loading || optionDisabled
  const danger = typeof option.danger === 'function' ? option.danger(context) : option.danger
  const separator = option.separator
  const optionNode = (
    <DropdownMenuItem
      disabled={disabled}
      variant={danger ? 'destructive' : 'default'}
      onSelect={async (event) => {
        if (!option.onClick) return
        event.preventDefault()
        if (loading) return
        setPending(true)
        try {
          await option.onClick(context)
        } finally {
          setPending(false)
        }
      }}
    >
      {loading ? <LoaderCircle className="size-4 animate-spin" /> : icon}
      <span>{label}</span>
      {shortcut && <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>}
    </DropdownMenuItem>
  )

  return (
    <>
      {(separator === 'left' || separator === 'both') && <DropdownMenuSeparator />}
      {optionNode}
      {(separator === 'right' || separator === 'both') && <DropdownMenuSeparator />}
    </>
  )
}
