import type { ReactNode } from 'react'

export interface ObjectFieldProps {
  title?: ReactNode
  description?: ReactNode
  action?: ReactNode
  children?: ReactNode
  collapsible?: boolean
  defaultOpen?: boolean
  variant?: 'bordered' | 'separated' | 'none'
  className?: string
  contentClassName?: string
}

export interface ObjectFieldHeaderProps {
  title?: ReactNode
  description?: ReactNode
  action?: ReactNode
  collapsible?: boolean
  open?: boolean
}

export interface ObjectFieldBodyProps extends ObjectFieldHeaderProps {
  separated?: boolean
  contentClassName?: string
  children?: ReactNode
}

export interface ObjectFieldContentProps {
  padded?: boolean
  className?: string
  children?: ReactNode
}
