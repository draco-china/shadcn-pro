'use client'

import { useCountdown } from '../../../hooks/use-countdown'
import { Input } from '../../input'
import { CaptchaSendButton } from './send-button'
import type { CaptchaProps } from './types'

export type { CaptchaProps } from './types'

export function Captcha({
  value,
  onChange,
  onSend,
  buttonText = 'Get code',
  countdown = 60000,
  placeholder = 'Enter captcha',
  disabled,
  className,
  inputClassName,
  buttonClassName,
  suffix,
  autoComplete,
  ...inputProps
}: CaptchaProps) {
  const { remaining, running, start } = useCountdown({ duration: countdown })

  async function handleSend() {
    await onSend?.()
    start()
  }

  return (
    <Input
      {...inputProps}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      inputClassName={inputClassName}
      autoComplete={autoComplete ?? 'off'}
      suffix={[
        suffix,
        <CaptchaSendButton
          key="captcha-action"
          disabled={disabled || running}
          countingDown={running}
          remaining={remaining}
          text={buttonText}
          className={buttonClassName}
          onClick={() => void handleSend()}
        />,
      ]}
    />
  )
}
