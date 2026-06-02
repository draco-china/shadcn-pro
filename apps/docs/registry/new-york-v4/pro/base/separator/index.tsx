import { Separator as SeparatorPrimitive } from 'radix-ui'
import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { separatorClassName } from './classes'

export interface ProSeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
}

export function ProSeparator({
  orientation = 'horizontal',
  decorative = true,
  className,
  ...props
}: ProSeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="pro-separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(separatorClassName, className)}
      {...props}
    />
  )
}
