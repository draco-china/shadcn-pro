import type { ISchema } from '@formily/json-schema'

export type SchemaNode = ISchema & {
  properties?: Record<string, SchemaNode>
  items?: SchemaNode | SchemaNode[]
  'x-component-props'?: Record<string, unknown>
  'x-validator'?: unknown
}
