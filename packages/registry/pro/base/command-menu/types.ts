import type { ReactNode } from 'react'

export interface ProCommandMenuOption {
  key: string
  value?: string
  label?: ReactNode
  icon?: ReactNode
  indicator?: ReactNode
  suffix?: ReactNode
  disabled?: boolean
  separator?: 'left' | 'right' | 'both'
  className?: string
  onSelect?: () => void
}

export interface ProCommandMenuProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger: ReactNode
  options: ProCommandMenuOption[]
  searchable?: boolean
  placeholder?: string
  emptyText?: ReactNode
  contentClassName?: string
}
