'use client'

import { Maximize2, Minimize2 } from 'lucide-react'
import type { MouseEvent, ReactNode } from 'react'
import { buttonIconClassName } from './classes'
import { TooltipButton, type TooltipButtonProps } from './tooltip'

export interface FullscreenButtonProps extends Omit<TooltipButtonProps, 'prefix' | 'tooltip'> {
  fullscreen: FullscreenButtonOptions
}

export interface FullscreenButtonOptions {
  value?: boolean
  enter?: ReactNode
  exit?: ReactNode
  onChange?: (fullscreen: boolean) => void
}

export function FullscreenButton({
  fullscreen: { value = false, enter = 'Fullscreen', exit = 'Exit fullscreen', onChange },
  onClick,
  ...props
}: FullscreenButtonProps) {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    onChange?.(!value)
    onClick?.(event)
  }

  return (
    <TooltipButton
      {...props}
      prefix={
        value ? (
          <Minimize2 className={buttonIconClassName} />
        ) : (
          <Maximize2 className={buttonIconClassName} />
        )
      }
      tooltip={value ? exit : enter}
      onClick={handleClick}
    />
  )
}
