import { cn } from '@/lib/utils'
import { objectFieldContentClassName, objectFieldContentPaddedClassName } from './classes'
import type { ObjectFieldContentProps } from './types'

export function ObjectFieldContent({ padded, className, children }: ObjectFieldContentProps) {
  return (
    <div
      className={cn(
        objectFieldContentClassName,
        padded && objectFieldContentPaddedClassName,
        className,
      )}
    >
      {children}
    </div>
  )
}
