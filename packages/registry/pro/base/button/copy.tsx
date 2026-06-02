'use client'

import { Check, X } from 'lucide-react'
import type { MouseEvent, ReactNode } from 'react'
import { type CopyOptions, useCopy } from '@/components/pro/base/hooks/use-copy'
import { copyErrorIconClassName, copySuccessIconClassName } from './classes'
import { TooltipButton, type TooltipButtonProps } from './tooltip'

export interface CopyButtonProps extends TooltipButtonProps {
  copy: CopyButtonCopyOptions
}

export interface CopyButtonCopyOptions extends CopyOptions {
  success?: ReactNode
  error?: ReactNode
}

export function CopyButton({ copy, prefix, tooltip, loading, onClick, ...props }: CopyButtonProps) {
  const copyAction = useCopy(copy)
  const isLoading = copyAction.copying || loading
  const feedback = getCopyFeedback(copy, copyAction.status)

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    if (isLoading) return

    void copyAction.copy().then((copied) => {
      if (copied) onClick?.(event)
    })
  }

  return (
    <TooltipButton
      {...props}
      prefix={feedback?.prefix ?? prefix}
      tooltip={feedback?.tooltip ?? tooltip}
      loading={isLoading}
      onClick={handleClick}
    />
  )
}

function getCopyFeedback(
  copy: CopyButtonCopyOptions,
  status: ReturnType<typeof useCopy>['status'],
) {
  if (status === 'success') {
    return {
      prefix: <Check className={copySuccessIconClassName} />,
      tooltip: copy.success,
    }
  }

  if (status === 'error') {
    return {
      prefix: <X className={copyErrorIconClassName} />,
      tooltip: copy.error ?? 'Copy failed',
    }
  }

  return undefined
}
