import type { SchemaNode } from './types'

export function inferSchemaComponent(schema: SchemaNode, isRoot = false) {
  if (schema.enum) return 'Select'

  switch (schema.type) {
    case 'string':
      return 'Input'
    case 'number':
    case 'integer':
      return 'Digit'
    case 'boolean':
      return 'Switch'
    case 'array':
      return 'ArrayField'
    case 'void':
      return schema.properties ? 'ProFormSection' : undefined
    case 'object':
      return isRoot ? undefined : 'ObjectField'
    default:
      return undefined
  }
}
