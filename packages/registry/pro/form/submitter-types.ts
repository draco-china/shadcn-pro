import type { Form } from '@formily/core'
import type { ReactNode } from 'react'
import type { ProFormActionsProps } from './layout'

export interface ProFormRenderContext {
  form: Form
  submitting: boolean
  submit: () => void
  reset: () => void | Promise<void>
}

export type ProFormSubmitterSlot =
  | ReactNode
  | ((actions: ReactNode, context: ProFormRenderContext) => ReactNode)

export interface ProFormSubmitterProps extends ProFormActionsProps {
  position?: 'header' | 'footer'
  header?: ProFormSubmitterSlot
  footer?: ProFormSubmitterSlot
}
