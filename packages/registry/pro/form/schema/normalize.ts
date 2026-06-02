import type { ISchema } from '@formily/json-schema'
import { normalizeEnumOptions } from './enum-options'
import { inferSchemaComponent } from './infer-component'
import type { SchemaNode } from './types'
import { normalizeValidator } from './validator'

export function normalizeSchema(schema: ISchema): ISchema {
  return normalizeSchemaNode(toSchemaNode(schema), true)
}

function normalizeSchemaNode(schema: SchemaNode, isRoot = false): SchemaNode {
  if (!isSchemaNode(schema)) return schema

  const next: SchemaNode = { ...schema }
  const hasProperties = !!next.properties

  if (!isRoot && !hasProperties && !next['x-decorator']) {
    next['x-decorator'] = 'FormItem'
  }

  if (!next['x-component']) {
    const component = inferSchemaComponent(next, isRoot)
    if (component) next['x-component'] = component
  }

  if (next['x-validator']) {
    next['x-validator'] = normalizeValidator(next['x-validator'])
  }

  if (Array.isArray(next.enum) && !next['x-component-props']?.options) {
    next['x-component-props'] = {
      ...next['x-component-props'],
      options: normalizeEnumOptions(next.enum),
    }
  }

  if (next.properties) {
    next.properties = normalizeSchemaProperties(next.properties)
  }

  if (Array.isArray(next.items)) {
    next.items = (next.items as unknown[]).map((item) =>
      normalizeSchemaNode(toSchemaNode(item), true),
    )
  } else if (next.items && typeof next.items === 'object') {
    next.items = normalizeSchemaNode(toSchemaNode(next.items), true)
  }

  return next
}

function normalizeSchemaProperties(properties: Record<string, SchemaNode>) {
  const nextProperties: Record<string, SchemaNode> = {}

  for (const key in properties) {
    nextProperties[key] = normalizeSchemaNode(properties[key])
  }

  return nextProperties
}

function isSchemaNode(schema: unknown): schema is SchemaNode {
  return schema !== null && typeof schema === 'object' && !Array.isArray(schema)
}

function toSchemaNode(schema: unknown): SchemaNode {
  return isSchemaNode(schema) ? schema : {}
}
