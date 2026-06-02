'use client'

import type {
  ArrayField as FormilyArrayFieldModel,
  ObjectField as FormilyObjectFieldModel,
} from '@formily/core'
import { RecursionField, useField, useFieldSchema } from '@formily/react'
import { observer } from '@formily/reactive-react'
import { ArrayField } from '../../base/fields/array-field'
import { ObjectField, type ObjectFieldProps } from '../../base/fields/object-field'
import { ProFormSection, type ProFormSectionProps } from '../layout'
import { fieldDisabled, fieldView } from './field'

export const FormilyArrayField = observer(() => {
  const field = useField<FormilyArrayFieldModel>()
  const schema = useFieldSchema()
  const itemSchema = Array.isArray(schema.items) ? schema.items[0] : schema.items
  const value: Record<string, unknown>[] = Array.isArray(field.value) ? field.value : []

  return (
    <ArrayField
      value={value}
      onChange={(next) => {
        field.setValue(next)
      }}
      newItem={() => ({})}
      disabled={fieldDisabled(field)}
      renderItem={(_, index) =>
        itemSchema ? <RecursionField schema={itemSchema} name={index} onlyRenderProperties /> : null
      }
    />
  )
})
FormilyArrayField.displayName = 'FormilyArrayField'

export const FormilyObjectField = observer(
  ({
    title,
    description,
    ...props
  }: Omit<ObjectFieldProps, 'children' | 'collapsible' | 'defaultOpen'>) => {
    const field = useField<FormilyObjectFieldModel>()
    const schema = useFieldSchema()

    return (
      <ObjectField
        {...props}
        title={title ?? field.title}
        description={description ?? field.description}
      >
        <RecursionField schema={schema} onlyRenderProperties />
      </ObjectField>
    )
  },
)
FormilyObjectField.displayName = 'FormilyObjectField'

export const FormilyProFormSection = observer(
  ({ title, description, ...props }: Omit<ProFormSectionProps, 'children'>) => {
    const field = fieldView(useField())
    const schema = useFieldSchema()

    return (
      <ProFormSection
        {...props}
        title={title ?? field.title}
        description={description ?? field.description}
      >
        <RecursionField schema={schema} onlyRenderProperties />
      </ProFormSection>
    )
  },
)
FormilyProFormSection.displayName = 'FormilyProFormSection'
