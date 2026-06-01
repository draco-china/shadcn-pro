'use client'

import type { ComponentProps, ReactNode } from 'react'
import { ProButton } from '@/registry/new-york-v4/pro/pro-base'
import { cn } from '@/lib/utils'

export type ProFormActionVariant = NonNullable<ComponentProps<typeof ProButton>['variant']>

export interface ProFormSectionProps {
  title?: ReactNode
  description?: ReactNode
  action?: ReactNode
  children?: ReactNode
  columns?: 1 | 2 | 3 | 4
  gap?: string
  className?: string
  contentClassName?: string
}

export type ProFormRootSectionSchema = {
  title?: ReactNode
  description?: ReactNode
  'x-component'?: string
  'x-component-props'?: Omit<ProFormSectionProps, 'children'>
}

const colsClass: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export function ProFormSection({
  title,
  description,
  action,
  children,
  columns,
  gap = 'gap-4',
  className,
  contentClassName,
}: ProFormSectionProps) {
  const hasHeader = title || description || action
  const layoutClassName = cn('grid', columns ? colsClass[columns] : 'grid-cols-1', gap)

  return (
    <section data-slot="pro-form-section" className={cn('grid gap-4', className)}>
      {hasHeader && (
        <div className="flex items-start justify-between gap-3 border-b pb-2">
          <div className="min-w-0 space-y-1">
            {title && <h3 className="text-sm font-medium leading-none">{title}</h3>}
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={cn(layoutClassName, contentClassName)}>{children}</div>
    </section>
  )
}

export function getProFormRootSectionProps(
  schema?: unknown,
): Omit<ProFormSectionProps, 'children'> | null {
  if (!schema || typeof schema !== 'object') return null

  const rootSchema = schema as ProFormRootSectionSchema
  if (rootSchema['x-component'] !== 'ProFormSection') return null

  const componentProps = rootSchema['x-component-props'] ?? {}

  return {
    ...componentProps,
    title: componentProps.title ?? rootSchema.title,
    description: componentProps.description ?? rootSchema.description,
  }
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
