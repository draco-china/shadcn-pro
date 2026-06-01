'use client'

import { createForm, type Form, type IFormProps } from '@formily/core'
import { FormProvider, type SchemaReactComponents } from '@formily/react'
import type { ReactNode } from 'react'
import * as React from 'react'
import { ProFormActions, type ProFormActionsProps, ProFormGrid } from './layout'
import { createSchemaFieldWithComponents, type ProFormSchema, SchemaField } from './schema'

export type {
  ProFormActionsProps,
  ProFormActionVariant,
  ProFormCancelActionProps,
  ProFormLayoutProps,
  ProFormResetActionProps,
  ProFormSubmitActionProps,
} from './layout'
export { DrawerForm, ModalForm } from './overlay-form'
export type { Form, IFormProps }
export { createForm, createSchemaFieldWithComponents, ProFormActions, ProFormGrid, SchemaField }

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
  /** Number of form columns (passed through to ProFormGrid) */
  columns?: 1 | 2 | 3 | 4
  className?: string
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

  const body = columns ? (
    <ProFormGrid columns={columns} className="mb-4">
      {formContent}
    </ProFormGrid>
  ) : (
    <div className="space-y-4">{formContent}</div>
  )

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
