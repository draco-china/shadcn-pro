import type { ReactNode } from 'react'
import { PaginationItem } from './elements'
import { NavigationLink } from './navigation-link'

export function PaginationNavigationControl({
  disabled,
  label,
  onClick,
  children,
}: {
  disabled: boolean
  label: string
  onClick: () => void
  children: ReactNode
}) {
  return (
    <PaginationItem>
      <NavigationLink disabled={disabled} label={label} onClick={onClick}>
        {children}
      </NavigationLink>
    </PaginationItem>
  )
}
