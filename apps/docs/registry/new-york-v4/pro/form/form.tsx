'use client'

import { FormProvider } from '@formily/react'
import { useMemo } from 'react'
import { formSchemaContentClassName } from './classes'
import { ProFormSchemaContent } from './schema/content'
import { getProFormSubmitterView, type ProFormRenderContext } from './submitter'
import type { ProFormProps } from './types'
import { useProForm } from './use-pro-form'

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
  gap,
  className,
}: ProFormProps) {
  const { activeForm, isSubmitting, reset, submit, handleSubmit } = useProForm({
    form,
    formProps,
    submitting: submitter === false ? undefined : submitter?.submitting,
    onFinish,
    onFinishFailed,
    onReset,
  })
  const renderContext = useMemo<ProFormRenderContext>(
    () => ({
      form: activeForm,
      submitting: isSubmitting,
      submit,
      reset,
    }),
    [activeForm, isSubmitting, reset, submit],
  )
  const submitterView = getProFormSubmitterView({ submitter, context: renderContext })

  return (
    <FormProvider form={activeForm}>
      <form onSubmit={handleSubmit} className={className}>
        {submitterView.header}
        <ProFormSchemaContent
          schema={schema}
          schemaComponents={schemaComponents}
          columns={columns}
          gap={gap}
          className={formSchemaContentClassName}
        >
          {children}
        </ProFormSchemaContent>
        {submitterView.footer}
      </form>
    </FormProvider>
  )
}
