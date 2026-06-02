import type { Form, IFormProps } from '@formily/core'
import type { SchemaReactComponents } from '@formily/react'
import type { ReactNode } from 'react'
import type { ProFormSchema } from '../schema'
import type { OverlayFormSubmitterProps } from './submitter'

export interface OverlayFormProps {
  /** The element that opens the form (e.g. a Button) */
  trigger?: ReactNode
  /** Dialog / Drawer title */
  title: string
  /** Dialog / Drawer description */
  description?: string
  /** Form contents */
  children?: ReactNode
  schema?: ProFormSchema
  schemaComponents?: SchemaReactComponents
  /** Controlled open state */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Called after validation passes — return/resolve to close, throw to keep open */
  onFinish?: (values: Record<string, unknown>) => void | Promise<void>
  onFinishFailed?: (errors: unknown) => void
  onCancel?: () => void | Promise<void>
  submitter?: false | OverlayFormSubmitterProps
  /** Formily Form instance (created internally if not provided) */
  form?: Form
  formProps?: IFormProps
  /** Column layout shortcut */
  columns?: 1 | 2 | 3 | 4
  gap?: string
  className?: string
}

export interface ModalFormProps extends OverlayFormProps {
  /** Dialog width class (default: sm:max-w-lg) */
  widthClass?: string
}

export interface DrawerFormProps extends OverlayFormProps {
  /** Drawer side (default: right) */
  side?: 'top' | 'right' | 'bottom' | 'left'
}
