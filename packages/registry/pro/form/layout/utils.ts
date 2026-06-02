import { cn } from '@/lib/utils'
import { proFormGridClassName } from './classes'
import type { ProFormRootSectionSchema, ProFormSectionProps } from './types'

type ProFormColumns = NonNullable<ProFormSectionProps['columns']>
type ProFormRootSectionRecord = ProFormRootSectionSchema & Record<string, unknown>

const gridColumns: Record<ProFormColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export function getProFormGridClassName(columns: ProFormColumns = 1, gap?: string) {
  return cn(proFormGridClassName, gridColumns[columns], gap)
}

export function getProFormRootSectionProps(
  schema?: unknown,
): Omit<ProFormSectionProps, 'children'> | null {
  if (!isProFormRootSectionSchema(schema)) return null

  const componentProps = schema['x-component-props'] ?? {}

  return {
    ...componentProps,
    title: componentProps.title ?? schema.title,
    description: componentProps.description ?? schema.description,
  }
}

export function getProFormFieldSchema(schema: Record<string, unknown>) {
  if (!isProFormRootSectionSchema(schema)) return schema

  const { 'x-component': _component, 'x-component-props': _componentProps, ...fieldSchema } = schema

  if (fieldSchema.type === 'void') {
    const { type: _type, ...schemaWithoutType } = fieldSchema
    return schemaWithoutType
  }

  return fieldSchema
}

function isProFormRootSectionSchema(schema: unknown): schema is ProFormRootSectionRecord {
  return (
    isRecord(schema) &&
    (schema['x-component'] === 'ProFormSection' ||
      (!schema['x-component'] && schema.type === 'void' && schema.properties !== undefined))
  )
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}
