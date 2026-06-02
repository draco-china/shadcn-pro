import { Slot } from 'radix-ui'
import type { HTMLAttributes } from 'react'
import { badgeVariants, type ProBadgeVariant } from './variants'

export type { ProBadgeVariant }
export { badgeVariants }

export interface ProBadgeProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean
  variant?: ProBadgeVariant
}

export function ProBadge({ asChild, variant = 'default', className, ...props }: ProBadgeProps) {
  const Comp = asChild ? Slot.Root : 'span'

  return (
    <Comp
      data-slot="pro-badge"
      data-variant={variant}
      className={badgeVariants({ variant, className })}
      {...props}
    />
  )
}
