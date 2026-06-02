import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { PaginationLink } from './elements'

interface NavigationLinkProps {
  active?: boolean
  disabled?: boolean
  label: string
  onClick: () => void
  children: ReactNode
}

export function NavigationLink({
  active,
  disabled,
  label,
  onClick,
  children,
}: NavigationLinkProps) {
  return (
    <PaginationLink
      href="#"
      size="icon"
      isActive={active}
      aria-label={label}
      aria-disabled={disabled}
      className={cn(
        'size-8',
        active && 'pointer-events-none',
        disabled && 'pointer-events-none opacity-50',
      )}
      onClick={(event) => {
        event.preventDefault()
        if (!disabled) onClick()
      }}
    >
      {children}
    </PaginationLink>
  )
}
