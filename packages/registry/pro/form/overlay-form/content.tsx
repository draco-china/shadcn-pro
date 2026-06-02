'use client'

import type { Form } from '@formily/core'
import { FormProvider, type SchemaReactComponents } from '@formily/react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import type { ProFormSchema } from '../schema'
import { ProFormSchemaContent } from '../schema/content'
import { overlayFormBodyClassName, overlayFormRootClassName } from './classes'

interface OverlayFormContentProps {
  form: Form
  schema?: ProFormSchema
  schemaComponents?: SchemaReactComponents
  columns?: 1 | 2 | 3 | 4
  gap?: string
  className?: string
  bodyClassName?: string
  children?: ReactNode
  footer?: ReactNode
  onSubmit: () => void | Promise<void>
}

export function OverlayFormContent({
  form,
  schema,
  schemaComponents,
  columns,
  gap,
  className,
  bodyClassName,
  children,
  footer,
  onSubmit,
}: OverlayFormContentProps) {
  return (
    <FormProvider form={form}>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          void onSubmit()
        }}
        className={cn(overlayFormRootClassName, className)}
      >
        <div className={cn(overlayFormBodyClassName, bodyClassName)}>
          <ProFormSchemaContent
            schema={schema}
            schemaComponents={schemaComponents}
            columns={columns}
            gap={gap}
          >
            {children}
          </ProFormSchemaContent>
        </div>
        {footer}
      </form>
    </FormProvider>
  )
}
