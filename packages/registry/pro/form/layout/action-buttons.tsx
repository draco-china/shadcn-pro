import { ProButton } from '@/components/pro/base/button'
import type {
  ProFormCancelActionProps,
  ProFormResetActionProps,
  ProFormSubmitActionProps,
} from './action-types'

export function ProFormCancelButton({
  options,
  disabled,
}: {
  options: ProFormCancelActionProps
  disabled: boolean
}) {
  if (options.hidden) return null

  return (
    <ProButton
      prefix={options.icon}
      variant={options.variant ?? 'outline'}
      disabled={options.disabled ?? disabled}
      onClick={options.onClick}
    >
      {options.text ?? 'Cancel'}
    </ProButton>
  )
}

export function ProFormResetButton({
  options,
  disabled,
}: {
  options: ProFormResetActionProps
  disabled: boolean
}) {
  if (options.hidden) return null

  return (
    <ProButton
      prefix={options.icon}
      variant={options.variant ?? 'secondary'}
      disabled={options.disabled ?? disabled}
      onClick={options.onClick}
    >
      {options.text ?? 'Reset'}
    </ProButton>
  )
}

export function ProFormSubmitButton({
  options,
  loading,
}: {
  options?: ProFormSubmitActionProps
  loading: boolean
}) {
  if (options?.hidden) return null

  return (
    <ProButton
      type="submit"
      prefix={options?.icon}
      variant={options?.variant ?? 'default'}
      loading={loading}
      disabled={options?.disabled || loading}
    >
      {loading ? (options?.submittingText ?? 'Submitting...') : (options?.text ?? 'Submit')}
    </ProButton>
  )
}
