'use client'

import { Tooltip as TooltipPrimitive } from 'radix-ui'
import type { ReactNode } from 'react'
import { ProButton, type ProButtonProps } from '@/components/pro/base/button'
import { isRenderableNode } from '../utils/react-node'
import { tooltipArrowClassName, tooltipContentClassName } from './classes'

export interface TooltipButtonProps extends ProButtonProps {
  tooltip?: ReactNode
}

export function TooltipButton({ tooltip, 'aria-label': ariaLabel, ...props }: TooltipButtonProps) {
  const resolvedAriaLabel = ariaLabel ?? (typeof tooltip === 'string' ? tooltip : undefined)

  if (!isRenderableNode(tooltip)) return <ProButton aria-label={resolvedAriaLabel} {...props} />

  return (
    <TooltipPrimitive.Provider delayDuration={300}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <ProButton aria-label={resolvedAriaLabel} {...props} />
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content sideOffset={0} className={tooltipContentClassName}>
            {tooltip}
            <TooltipPrimitive.Arrow className={tooltipArrowClassName} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
