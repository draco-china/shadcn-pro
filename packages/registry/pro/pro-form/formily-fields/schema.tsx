'use client'

import type {
  ArrayField as FormilyArrayFieldModel,
  ObjectField as FormilyObjectFieldModel,
} from '@formily/core'
import { RecursionField, useField, useFieldSchema } from '@formily/react'
import { observer } from '@formily/reactive-react'
import { ArrayField } from '../../pro-fields/array-field'
import { ObjectField, type ObjectFieldProps } from '../../pro-fields/object-field'

export const FormilyArrayField = observer(() => {
  const field = useField<FormilyArrayFieldModel>()
  const schema = useFieldSchema()
  const value: unknown[] = Array.isArray(field.value) ? field.value : []

  return (
    <ArrayField
      value={value}
      disabled={field.disabled}
      onAdd={() => field.push({})}
      onRemove={(index) => field.remove(index)}
      onMoveUp={(index) => field.moveUp(index)}
      onMoveDown={(index) => field.moveDown(index)}
      renderItem={(_, index) => (
        <RecursionField schema={schema.items as typeof schema} name={index} onlyRenderProperties />
      )}
    />
  )
})
FormilyArrayField.displayName = 'FormilyArrayField'

export const FormilyObjectField = observer(
  ({
    collapsible = false,
    defaultOpen = true,
    ...props
  }: {
    collapsible?: boolean
    defaultOpen?: boolean
  } & Omit<ObjectFieldProps, 'children' | 'collapsible' | 'defaultOpen'>) => {
    const field = useField<FormilyObjectFieldModel>()
    const schema = useFieldSchema()

    return (
      <ObjectField
        {...props}
        title={props.title ?? field.title}
        description={props.description ?? field.description}
        collapsible={collapsible}
        defaultOpen={defaultOpen}
      >
        <RecursionField schema={schema} onlyRenderProperties />
      </ObjectField>
    )
  },
)
FormilyObjectField.displayName = 'FormilyObjectField'
