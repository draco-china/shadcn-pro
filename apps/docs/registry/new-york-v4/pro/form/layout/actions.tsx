import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { ProFormCancelButton, ProFormResetButton, ProFormSubmitButton } from './action-buttons'
import type {
  ProFormCancelActionProps,
  ProFormResetActionProps,
  ProFormSubmitActionProps,
} from './action-types'
import { proFormActionsClassName } from './classes'

export type {
  ProFormActionVariant,
  ProFormCancelActionProps,
  ProFormResetActionProps,
  ProFormSubmitActionProps,
} from './action-types'

export interface ProFormActionsProps {
  submitting?: boolean
  loading?: boolean
  submit?: ProFormSubmitActionProps | false
  cancel?: ProFormCancelActionProps | false
  reset?: ProFormResetActionProps | false
  className?: string
  children?: ReactNode
}

export function ProFormActions({
  submitting,
  loading = false,
  submit,
  cancel,
  reset,
  className,
  children,
}: ProFormActionsProps) {
  const submitOptions = submit === false ? undefined : submit
  const isSubmitting = submitOptions?.loading ?? submitting ?? loading

  return (
    <div data-slot="pro-form-actions" className={cn(proFormActionsClassName, className)}>
      {cancel && <ProFormCancelButton options={cancel} disabled={isSubmitting} />}
      {reset && <ProFormResetButton options={reset} disabled={isSubmitting} />}
      {submit !== false && <ProFormSubmitButton options={submitOptions} loading={isSubmitting} />}
      {children}
    </div>
  )
}
