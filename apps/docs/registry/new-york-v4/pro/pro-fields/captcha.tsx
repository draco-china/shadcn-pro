'use client'

import { RefreshCw } from 'lucide-react'
import type * as React from 'react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface CaptchaProps
  extends Omit<React.ComponentProps<typeof Input>, 'value' | 'onChange' | 'disabled'> {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRefresh?: () => void
  captchaUrl?: string
  captchaText?: string
  buttonText?: string
  countdown?: number
  disabled?: boolean
  inputClassName?: string
  buttonClassName?: string
}

export function CaptchaBase({
  value,
  onChange,
  onRefresh,
  captchaUrl,
  captchaText,
  buttonText = 'Get code',
  countdown = 60,
  placeholder = 'Enter captcha',
  disabled,
  className,
  inputClassName,
  buttonClassName,
  autoComplete,
  ...inputProps
}: CaptchaProps) {
  const [remaining, setRemaining] = useState(0)
  const hasVisualCaptcha = Boolean(captchaUrl || captchaText)
  const countingDown = remaining > 0

  useEffect(() => {
    if (remaining <= 0) return

    const timer = window.setInterval(() => {
      setRemaining((current) => Math.max(current - 1, 0))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [remaining])

  function handleAction() {
    onRefresh?.()
    if (countdown > 0) setRemaining(countdown)
  }

  return (
    <div className={cn('flex gap-2', className)}>
      <Input
        {...inputProps}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn('flex-1', inputClassName)}
        autoComplete={autoComplete ?? 'off'}
      />
      {hasVisualCaptcha && (
        <div className="flex items-center gap-1 shrink-0">
          {captchaUrl ? (
            <img
              src={captchaUrl}
              alt="Captcha"
              className="h-9 w-24 rounded-md border object-cover"
            />
          ) : (
            <div className="flex h-9 w-24 items-center justify-center rounded-md border bg-muted font-mono text-sm tracking-widest select-none">
              {captchaText}
            </div>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={disabled}
            aria-label="Refresh captcha"
            onClick={onRefresh}
            className="h-9 w-9"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!hasVisualCaptcha && (
        <Button
          type="button"
          variant="outline"
          disabled={disabled || countingDown}
          onClick={handleAction}
          className={cn('h-9 shrink-0 px-3', buttonClassName)}
        >
          {countingDown ? `${remaining}s` : buttonText}
        </Button>
      )}
    </div>
  )
}
