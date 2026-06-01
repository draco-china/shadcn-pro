'use client'

import type { ComponentProps, ReactNode } from 'react'
import { ProButton } from '@/components/pro/pro-base'
import { cn } from '@/lib/utils'

export interface ProFormLayoutProps {
  children?: ReactNode
  columns?: 1 | 2 | 3 | 4
  gap?: string
  className?: string
}

const colsClass: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export type ProFormActionVariant = NonNullable<ComponentProps<typeof ProButton>['variant']>

export function ProFormGrid({
  children,
  columns = 1,
  gap = 'gap-4',
  className,
}: ProFormLayoutProps) {
  return (
    <div className={cn('grid', colsClass[columns] ?? 'grid-cols-1', gap, className)}>
      {children}
    </div>
  )
}

export interface ProFormSubmitActionProps {
  text?: string
  submittingText?: string
  hidden?: boolean
  disabled?: boolean
  loading?: boolean
  icon?: ReactNode
  variant?: ProFormActionVariant
}

export interface ProFormCancelActionProps {
  text?: string
  hidden?: boolean
  disabled?: boolean
  icon?: ReactNode
  variant?: ProFormActionVariant
  onClick?: () => void | Promise<void>
}

export interface ProFormResetActionProps {
  text?: string
  hidden?: boolean
  disabled?: boolean
  icon?: ReactNode
  variant?: ProFormActionVariant
  onClick?: () => void | Promise<void>
}

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
  const submitOptions = submit === false ? undefined : (submit ?? {})
  const cancelOptions = cancel === false ? undefined : cancel
  const resetOptions = reset === false ? undefined : reset
  const isSubmitting =
    submitOptions?.loading !== undefined ? submitOptions.loading : (submitting ?? loading)

  return (
    <div
      data-slot="pro-form-actions"
      className={cn('flex flex-wrap items-center gap-2', className)}
    >
      {cancelOptions && !cancelOptions.hidden && (
        <ProButton
          icon={cancelOptions.icon}
          variant={cancelOptions.variant ?? 'outline'}
          disabled={cancelOptions.disabled ?? isSubmitting}
          onClick={cancelOptions.onClick}
        >
          {cancelOptions.text ?? 'Cancel'}
        </ProButton>
      )}
      {resetOptions && !resetOptions.hidden && (
        <ProButton
          icon={resetOptions.icon}
          variant={resetOptions.variant ?? 'ghost'}
          disabled={resetOptions.disabled ?? isSubmitting}
          onClick={resetOptions.onClick}
        >
          {resetOptions.text ?? 'Reset'}
        </ProButton>
      )}
      {!submitOptions?.hidden && (
        <ProButton
          type="submit"
          icon={submitOptions?.icon}
          variant={submitOptions?.variant ?? 'default'}
          loading={isSubmitting}
          disabled={submitOptions?.disabled || isSubmitting}
        >
          {isSubmitting
            ? (submitOptions?.submittingText ?? 'Submitting...')
            : (submitOptions?.text ?? 'Submit')}
        </ProButton>
      )}
      {children}
    </div>
  )
}
