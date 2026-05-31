'use client'

import { Check, LoaderCircle, X } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { type ProCopyOptions, useProCopy } from './copy'

export interface ProButtonProps
  extends Omit<React.ComponentProps<typeof Button>, 'children' | 'disabled' | 'onClick'> {
  icon?: React.ReactNode
  copy?: ProButtonCopyOptions
  loading?: boolean
  disabled?: boolean
  tooltip?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
  children?: React.ReactNode
}

export interface ProButtonCopyOptions extends ProCopyOptions {
  success?: React.ReactNode
  error?: React.ReactNode
}

export function ProButton({
  icon,
  copy,
  loading: loadingProp,
  disabled: disabledProp,
  tooltip,
  onClick,
  children,
  type = 'button',
  ...buttonProps
}: ProButtonProps) {
  const [pending, setPending] = React.useState(false)
  const copyAction = useProCopy(copy)
  const loading = pending || copyAction.copying || loadingProp
  const disabled = loading || disabledProp
  const copyFeedback = {
    success: {
      icon: <Check className="size-4 text-green-600 dark:text-green-400" />,
      tooltip: copy?.success,
    },
    error: {
      icon: <X className="size-4 text-destructive" />,
      tooltip: copy?.error ?? 'Copy failed',
    },
  }
  const feedback =
    copyAction.status === 'success' || copyAction.status === 'error'
      ? copyFeedback[copyAction.status]
      : undefined
  const resolvedIcon = feedback?.icon ?? icon
  const resolvedChildren = children
  const resolvedTooltip = feedback?.tooltip ?? tooltip
  const iconOnly = Boolean(resolvedIcon) && !resolvedChildren

  const button = (
    <Button
      type={type}
      {...buttonProps}
      disabled={disabled}
      aria-label={
        buttonProps['aria-label'] ??
        (iconOnly && typeof resolvedTooltip === 'string' ? resolvedTooltip : undefined)
      }
      onClick={(event) => {
        if (loading) return
        if (!onClick && !copy) return

        if (copy) {
          setPending(true)
          void Promise.resolve(copyAction.copy())
            .then(() => onClick?.(event))
            .finally(() => setPending(false))
          return
        }

        const result = onClick?.(event)
        if (!isPromiseLike(result)) return

        setPending(true)
        void result.finally(() => setPending(false))
      }}
    >
      {loading ? <LoaderCircle className="size-4 animate-spin" /> : resolvedIcon}
      {resolvedChildren}
    </Button>
  )

  if (!resolvedTooltip) return button

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>{resolvedTooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function isPromiseLike(value: unknown): value is Promise<unknown> {
  return Boolean(
    value && typeof value === 'object' && 'finally' in value && typeof value.finally === 'function',
  )
}
