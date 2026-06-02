'use client'

import { Input } from '../../input'
import type { VisualCaptchaProps } from './types'
import { CaptchaVisualAddon } from './visual-addon'

export type { VisualCaptchaProps } from './types'

export function VisualCaptcha({
  value,
  onChange,
  onRefresh,
  captchaUrl,
  captchaText,
  placeholder = 'Enter captcha',
  disabled,
  className,
  inputClassName,
  suffix,
  autoComplete,
  ...inputProps
}: VisualCaptchaProps) {
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
        <CaptchaVisualAddon
          key="captcha-visual"
          url={captchaUrl}
          text={captchaText}
          disabled={disabled}
          onRefresh={onRefresh}
        />,
      ]}
    />
  )
}
