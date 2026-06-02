'use client'

import type { SchemaReactComponents } from '@formily/react'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { getProFormFieldSchema, ProFormBody } from '../layout'
import { createSchemaFieldWithComponents, type ProFormSchema } from './field'

export interface ProFormSchemaContentProps {
  schema?: ProFormSchema
  schemaComponents?: SchemaReactComponents
  columns?: 1 | 2 | 3 | 4
  gap?: string
  className?: string
  children?: ReactNode
}

export function ProFormSchemaContent({
  schema,
  schemaComponents,
  columns,
  gap,
  className,
  children,
}: ProFormSchemaContentProps) {
  const ActiveSchemaField = useMemo(
    () => createSchemaFieldWithComponents(schemaComponents),
    [schemaComponents],
  )
  const fieldSchema = schema ? getProFormFieldSchema(schema) : undefined

  return (
    <ProFormBody schema={schema} columns={columns} gap={gap} className={className}>
      {fieldSchema !== undefined && <ActiveSchemaField schema={fieldSchema} />}
      {children}
    </ProFormBody>
  )
}
