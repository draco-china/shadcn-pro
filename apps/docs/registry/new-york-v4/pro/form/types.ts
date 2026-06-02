import type { Form, IFormProps } from '@formily/core'
import type { SchemaReactComponents } from '@formily/react'
import type { ReactNode } from 'react'
import type { ProFormSchema } from './schema'
import type { ProFormSubmitterProps } from './submitter'

export interface ProFormProps {
  form?: Form
  formProps?: IFormProps
  schema?: ProFormSchema
  schemaComponents?: SchemaReactComponents
  children?: ReactNode
  onFinish?: (values: Record<string, unknown>) => void | Promise<void>
  onFinishFailed?: (errors: unknown) => void
  onReset?: () => void | Promise<void>
  submitter?: false | ProFormSubmitterProps
  columns?: 1 | 2 | 3 | 4
  gap?: string
  className?: string
}
