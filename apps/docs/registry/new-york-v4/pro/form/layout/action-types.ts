import type { ReactNode } from 'react'
import type { ProButtonProps } from '@/components/pro/base/button'

export type ProFormActionVariant = ProButtonProps['variant']

export interface ProFormSubmitActionProps {
  text?: string
  submittingText?: string
  hidden?: boolean
  disabled?: boolean
  loading?: boolean
  icon?: ReactNode
  variant?: ProFormActionVariant
}

export interface ProFormCancelActionProps {
  text?: string
  hidden?: boolean
  disabled?: boolean
  icon?: ReactNode
  variant?: ProFormActionVariant
  onClick?: () => void | Promise<void>
}

export interface ProFormResetActionProps {
  text?: string
  hidden?: boolean
  disabled?: boolean
  icon?: ReactNode
  variant?: ProFormActionVariant
  onClick?: () => void | Promise<void>
}
