import type { MouseEvent } from 'react'
import { ProButton } from '@/components/pro/base/button'

export interface CaptchaSendButtonProps {
  disabled?: boolean
  countingDown?: boolean
  remaining: number
  text: string
  className?: string
  onClick: () => void
}

export function CaptchaSendButton({
  disabled,
  countingDown,
  remaining,
  text,
  className,
  onClick,
}: CaptchaSendButtonProps) {
  return (
    <ProButton
      type="button"
      variant="ghost"
      size="sm"
      disabled={disabled || countingDown}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        onClick()
      }}
      className={className}
    >
      {countingDown ? `${Math.ceil(remaining / 1000)}s` : text}
    </ProButton>
  )
}
