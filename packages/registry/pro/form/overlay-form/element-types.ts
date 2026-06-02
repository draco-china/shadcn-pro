import type { HTMLAttributes, ReactNode } from 'react'

export interface OverlayElementRootProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: ReactNode
}

export interface OverlayElementTriggerProps {
  asChild?: boolean
  children?: ReactNode
}

export interface OverlayElementContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export interface OverlayElementTextProps {
  className?: string
  children?: ReactNode
}
