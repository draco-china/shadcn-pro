import { RefreshButton } from '@/components/pro/base/button/refresh'
import {
  captchaImageClassName,
  captchaTextClassName,
  captchaVisualAddonClassName,
} from '../classes'

export interface CaptchaVisualAddonProps {
  url?: string
  text?: string
  disabled?: boolean
  onRefresh?: () => void | Promise<void>
}

export function CaptchaVisualAddon({ url, text, disabled, onRefresh }: CaptchaVisualAddonProps) {
  return (
    <div className={captchaVisualAddonClassName}>
      {url ? (
        <img src={url} alt="Captcha" className={captchaImageClassName} />
      ) : (
        <div className={captchaTextClassName}>{text}</div>
      )}
      <RefreshButton
        tooltip="Refresh captcha"
        variant="ghost"
        size="icon"
        disabled={disabled}
        onClick={onRefresh}
      />
    </div>
  )
}
