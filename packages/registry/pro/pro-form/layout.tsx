'use client'

import type { ReactNode } from 'react'
import {
  ProToolbar,
  type ProToolbarButtonItem,
  type ProToolbarItem,
} from '@/components/pro/pro-toolbar'
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

export type ProFormActionVariant = NonNullable<ProToolbarButtonItem<unknown>['variant']>

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
  actionsVariant?: 'page' | 'inline' | 'overlay'
  align?: 'left' | 'center' | 'right'
  className?: string
  children?: ReactNode
}

export function ProFormActions({
  submitting,
  loading = false,
  submit,
  cancel,
  reset,
  actionsVariant = 'inline',
  align = 'left',
  className,
  children,
}: ProFormActionsProps) {
  const submitOptions = submit === false ? undefined : (submit ?? {})
  const cancelOptions = cancel === false ? undefined : cancel
  const resetOptions = reset === false ? undefined : reset
  const isSubmitting =
    submitOptions?.loading !== undefined ? submitOptions.loading : (submitting ?? loading)
  const items: ProToolbarItem[] = [
    ...(cancelOptions && !cancelOptions.hidden
      ? [
          {
            key: 'cancel',
            label: cancelOptions.text ?? 'Cancel',
            icon: cancelOptions.icon,
            variant: cancelOptions.variant ?? 'outline',
            disabled: cancelOptions.disabled ?? isSubmitting,
            onClick: cancelOptions.onClick,
          },
        ]
      : []),
    ...(resetOptions && !resetOptions.hidden
      ? [
          {
            key: 'reset',
            label: resetOptions.text ?? 'Reset',
            icon: resetOptions.icon,
            variant: resetOptions.variant ?? 'ghost',
            disabled: resetOptions.disabled ?? isSubmitting,
            onClick: resetOptions.onClick,
          },
        ]
      : []),
    ...(submitOptions?.hidden
      ? []
      : [
          {
            key: 'submit',
            label: isSubmitting
              ? (submitOptions?.submittingText ?? 'Submitting...')
              : (submitOptions?.text ?? 'Submit'),
            icon: submitOptions?.icon,
            variant: submitOptions?.variant ?? 'default',
            loading: isSubmitting,
            disabled: submitOptions?.disabled || isSubmitting,
            htmlType: 'submit' as const,
          },
        ]),
  ]

  const toolbarClassName = cn(
    actionsVariant === 'overlay' && 'border-t pt-4',
    actionsVariant === 'page' && 'border-b pb-3',
    'pt-2',
    className,
  )
  const actionItems = children ? [...items, { key: 'children', render: () => children }] : items

  return (
    <ProToolbar
      left={align === 'left' ? { options: actionItems } : undefined}
      center={align === 'center' ? { options: actionItems } : undefined}
      right={align === 'right' ? { options: actionItems } : undefined}
      className={toolbarClassName}
    />
  )
}
