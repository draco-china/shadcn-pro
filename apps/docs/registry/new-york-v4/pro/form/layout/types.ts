import type { ReactNode } from 'react'

export interface ProFormSectionProps {
  title?: ReactNode
  description?: ReactNode
  action?: ReactNode
  children?: ReactNode
  columns?: 1 | 2 | 3 | 4
  gap?: string
  className?: string
  contentClassName?: string
}

export interface ProFormBodyProps {
  schema?: unknown
  children?: ReactNode
  columns?: 1 | 2 | 3 | 4
  gap?: string
  className?: string
}

export type ProFormRootSectionSchema = {
  type?: string
  title?: ReactNode
  description?: ReactNode
  properties?: Record<string, unknown>
  'x-component'?: string
  'x-component-props'?: Omit<ProFormSectionProps, 'children'>
}
