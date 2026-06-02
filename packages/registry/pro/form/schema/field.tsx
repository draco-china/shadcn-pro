'use client'

import type { ISchema } from '@formily/json-schema'
import { createSchemaField, type SchemaReactComponents } from '@formily/react'
import { defaultSchemaComponents } from './components'
import { normalizeSchema } from './normalize'

export interface ProSchemaFieldProps {
  schema?: ProFormSchema
  [key: string]: unknown
}

export type ProFormSchema = ISchema

export function createSchemaFieldWithComponents(extra?: SchemaReactComponents) {
  const BaseSchemaField = createSchemaField({
    components: { ...defaultSchemaComponents, ...extra },
  })

  return Object.assign(function ProSchemaField({ schema, ...props }: ProSchemaFieldProps) {
    return <BaseSchemaField {...props} schema={schema ? normalizeSchema(schema) : schema} />
  }, BaseSchemaField)
}

export const SchemaField = createSchemaFieldWithComponents()
