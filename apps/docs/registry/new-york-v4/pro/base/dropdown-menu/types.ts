import type { ReactNode } from 'react'

export interface ProDropdownMenuOption {
  key: string
  label?: ReactNode
  icon?: ReactNode
  shortcut?: ReactNode
  disabled?: boolean
  loading?: boolean
  danger?: boolean
  separator?: 'left' | 'right' | 'both'
  onSelect?: (event: Event) => void
}

export interface ProDropdownMenuProps {
  trigger: ReactNode
  tooltip?: ReactNode
  options: ProDropdownMenuOption[]
}
