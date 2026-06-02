import type { Key, ReactNode } from 'react'

export type ProDescriptionsColumns = 1 | 2 | 3 | 4
export type DescriptionSpan = ProDescriptionsColumns
export type ProDescriptionsLayout = 'horizontal' | 'vertical'

export interface DescriptionsItem {
  key?: Key
  label: ReactNode
  value?: ReactNode
  span?: number
  className?: string
}

export interface ProDescriptionsProps {
  title?: ReactNode
  items: DescriptionsItem[]
  columns?: ProDescriptionsColumns
  bordered?: boolean
  layout?: ProDescriptionsLayout
  className?: string
  labelClassName?: string
  valueClassName?: string
}
