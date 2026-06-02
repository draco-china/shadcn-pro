import { Label as LabelPrimitive } from 'radix-ui'
import type { LabelHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { labelClassName } from './classes'

export type ProLabelProps = LabelHTMLAttributes<HTMLLabelElement>

export function ProLabel({ className, ...props }: ProLabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="pro-label"
      className={cn(labelClassName, className)}
      {...props}
    />
  )
}
