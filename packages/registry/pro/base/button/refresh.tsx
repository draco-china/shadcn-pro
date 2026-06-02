'use client'

import { RefreshCw } from 'lucide-react'
import type { MouseEvent } from 'react'
import { cn } from '@/lib/utils'
import { buttonIconClassName } from './classes'
import { TooltipButton, type TooltipButtonProps } from './tooltip'

export type RefreshButtonProps = TooltipButtonProps

export function RefreshButton({
  prefix,
  tooltip = 'Refresh',
  loading,
  disabled,
  onClick,
  ...props
}: RefreshButtonProps) {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    if (loading) return
    onClick?.(event)
  }

  return (
    <TooltipButton
      {...props}
      prefix={
        prefix ?? <RefreshCw className={cn(buttonIconClassName, loading && 'animate-spin')} />
      }
      tooltip={tooltip}
      disabled={disabled || loading}
      onClick={handleClick}
    />
  )
}
