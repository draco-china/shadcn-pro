'use client'

import type { MouseEvent } from 'react'
import { ProButton } from '@/components/pro/base/button'
import { CopyButton } from '@/components/pro/base/button/copy'
import { TooltipButton } from '@/components/pro/base/button/tooltip'
import { isRenderableNode } from '@/components/pro/base/utils/react-node'
import type { ProToolbarButtonItem, ProToolbarButtonSize, ProToolbarButtonVariant } from '../types'
import { renderToolbarContent, resolveToolbarCopy, resolveToolbarState } from './utils'

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
  const controlledLoading = resolveToolbarState(item.loading, context)
  const itemDisabled = resolveToolbarState(item.disabled, context)
  const resolvedCopy = resolveToolbarCopy(item.copy, context)
  const resolvedTooltip = renderToolbarContent(item.tooltip, context)
  const content = renderToolbarContent(item.label, context)
  const icon = renderToolbarContent(item.icon, context)
  const buttonType = item.htmlType ?? 'button'
  const buttonVariant = item.variant ?? variant
  const buttonSize = item.size ?? size

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    item.onClick?.(context)
  }

  if (resolvedCopy) {
    return (
      <CopyButton
        type={buttonType}
        variant={buttonVariant}
        size={buttonSize}
        prefix={icon}
        loading={controlledLoading}
        disabled={itemDisabled}
        onClick={handleClick}
        className={item.className}
        title={item.title}
        aria-label={item['aria-label']}
        tooltip={resolvedTooltip}
        copy={resolvedCopy}
      >
        {content}
      </CopyButton>
    )
  }

  if (isRenderableNode(resolvedTooltip)) {
    return (
      <TooltipButton
        type={buttonType}
        variant={buttonVariant}
        size={buttonSize}
        prefix={icon}
        loading={controlledLoading}
        disabled={itemDisabled}
        onClick={handleClick}
        className={item.className}
        title={item.title}
        aria-label={item['aria-label']}
        tooltip={resolvedTooltip}
      >
        {content}
      </TooltipButton>
    )
  }

  return (
    <ProButton
      type={buttonType}
      variant={buttonVariant}
      size={buttonSize}
      prefix={icon}
      loading={controlledLoading}
      disabled={itemDisabled}
      onClick={handleClick}
      className={item.className}
      title={item.title}
      aria-label={item['aria-label']}
    >
      {content}
    </ProButton>
  )
}
