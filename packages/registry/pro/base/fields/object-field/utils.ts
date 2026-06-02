import { cn } from '@/lib/utils'
import type { ObjectFieldProps } from './types'

export function isSeparatedObjectField(variant: ObjectFieldProps['variant']) {
  return variant === 'separated'
}

export function getObjectFieldRootClassName({
  variant,
  className,
}: Pick<ObjectFieldProps, 'variant' | 'className'>) {
  return cn(variant === 'bordered' && 'border-l-2 border-border pl-4', className)
}
