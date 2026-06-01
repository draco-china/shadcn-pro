'use client'

import { createForm, type Form, type IFormProps } from '@formily/core'
import { FormProvider, type SchemaReactComponents } from '@formily/react'
import type { ReactNode } from 'react'
import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  getProFormRootSectionProps,
  ProFormActions,
  type ProFormActionsProps,
  ProFormSection,
} from './layout'
import { createSchemaFieldWithComponents, type ProFormSchema, SchemaField } from './schema'

export type {
  ProFormActionsProps,
  ProFormActionVariant,
  ProFormCancelActionProps,
  ProFormResetActionProps,
  ProFormSectionProps,
  ProFormSubmitActionProps,
} from './layout'
export { DrawerForm, ModalForm } from './overlay-form'
export type { Form, IFormProps }
export { createForm, createSchemaFieldWithComponents, ProFormActions, ProFormSection, SchemaField }

export interface ProFormRenderContext {
  form: Form
  submitting: boolean
  submit: () => void
  reset: () => void | Promise<void>
}

export type ProFormSubmitterSlot =
  | ReactNode
  | ((actions: ReactNode, context: ProFormRenderContext) => ReactNode)

export interface ProFormSubmitterProps extends ProFormActionsProps {
  position?: 'header' | 'footer'
  header?: ProFormSubmitterSlot
  footer?: ProFormSubmitterSlot
}

export interface ProFormProps {
  form?: Form
  formProps?: IFormProps
  schema?: ProFormSchema
  schemaComponents?: SchemaReactComponents
  children?: ReactNode
  onFinish?: (values: Record<string, unknown>) => void | Promise<void>
  onFinishFailed?: (errors: unknown) => void
  onReset?: () => void | Promise<void>
  /** Submitter config. Set to false to hide built-in actions. */
  submitter?: false | ProFormSubmitterProps
  /** Number of columns for the top-level form body */
  columns?: 1 | 2 | 3 | 4
  className?: string
}

const colsClass: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export function ProForm({
  form,
  formProps,
  schema,
  schemaComponents,
  children,
  onFinish,
  onFinishFailed,
  onReset,
  submitter,
  columns,
  className,
}: ProFormProps) {
  const [loading, setLoading] = React.useState(false)
  const internalFormRef = React.useRef<Form | null>(null)

  if (!internalFormRef.current) {
    internalFormRef.current = createForm(formProps)
  }

  const activeForm = form ?? internalFormRef.current
  const ActiveSchemaField = React.useMemo(
    () => createSchemaFieldWithComponents(schemaComponents),
    [schemaComponents],
  )
  const activeSubmitter = submitter === false ? undefined : (submitter ?? {})
  const isSubmitting = activeSubmitter?.submitting ?? loading

  const handleReset = React.useCallback(async () => {
    await activeForm.reset()
    await onReset?.()
  }, [activeForm, onReset])

  const submit = React.useCallback(async () => {
    if (isSubmitting) return

    setLoading(true)
    try {
      await activeForm.validate()
      await onFinish?.(activeForm.values)
    } catch (err) {
      onFinishFailed?.(err)
    } finally {
      setLoading(false)
    }
  }, [activeForm, isSubmitting, onFinish, onFinishFailed])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    void submit()
  }

  const activeActionsPlacement = activeSubmitter?.header
    ? 'header'
    : (activeSubmitter?.position ?? 'footer')
  const {
    position: _position,
    header: submitterHeader,
    footer: submitterFooter,
    ...submitterActions
  } = activeSubmitter ?? {}
  const renderContext = React.useMemo<ProFormRenderContext>(
    () => ({
      form: activeForm,
      submitting: isSubmitting,
      submit,
      reset: handleReset,
    }),
    [activeForm, handleReset, isSubmitting, submit],
  )
  const baseActionsProps: ProFormActionsProps = {
    ...submitterActions,
    submitting: submitterActions.submitting ?? isSubmitting,
    reset:
      submitterActions.reset === false
        ? false
        : submitterActions.reset
          ? {
              ...submitterActions.reset,
              onClick: submitterActions.reset.onClick ?? handleReset,
            }
          : undefined,
  }

  const actionsNode = activeSubmitter ? <ProFormActions {...baseActionsProps} /> : null
  const headerSubmitterNode = renderSubmitterSlot(
    submitterHeader,
    actionsNode,
    renderContext,
    defaultHeaderSubmitter,
  )
  const footerSubmitterNode = renderSubmitterSlot(
    submitterFooter,
    actionsNode,
    renderContext,
    defaultFooterSubmitter,
  )

  const formContent = (
    <>
      {schema && <ActiveSchemaField schema={schema} />}
      {children}
    </>
  )

  const body = renderFormBody(formContent, schema, columns)

  return (
    <FormProvider form={activeForm}>
      <form onSubmit={handleSubmit} className={className}>
        {activeSubmitter && activeActionsPlacement === 'header' && headerSubmitterNode}
        {body}
        {activeSubmitter && activeActionsPlacement === 'footer' && footerSubmitterNode}
      </form>
    </FormProvider>
  )
}

function renderFormBody(content: ReactNode, schema?: ProFormSchema, columns?: 1 | 2 | 3 | 4) {
  const rootSectionProps = getProFormRootSectionProps(schema)

  if (rootSectionProps) {
    return (
      <ProFormSection
        {...rootSectionProps}
        columns={rootSectionProps.columns ?? columns}
        className={cn('mb-4', rootSectionProps.className)}
      >
        {content}
      </ProFormSection>
    )
  }

  return (
    <div className={cn(columns ? ['mb-4 grid gap-4', colsClass[columns]] : 'space-y-4')}>
      {content}
    </div>
  )
}

function renderSubmitterSlot(
  slot: ProFormSubmitterSlot | undefined,
  actions: ReactNode,
  context: ProFormRenderContext,
  defaultRender: (actions: ReactNode, context: ProFormRenderContext) => ReactNode,
) {
  if (!slot) return defaultRender(actions, context)
  return typeof slot === 'function' ? slot(actions, context) : slot
}

function defaultHeaderSubmitter(actions: ReactNode) {
  return <div className="flex flex-wrap items-start justify-end gap-3 border-b pb-2">{actions}</div>
}

function defaultFooterSubmitter(actions: ReactNode) {
  return <div className="pt-2">{actions}</div>
}
