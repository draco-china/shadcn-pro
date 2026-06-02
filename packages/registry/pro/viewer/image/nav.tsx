import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProButton } from '@/components/pro/base/button'
import { cn } from '@/lib/utils'
import {
  imageNavButtonClassName,
  imageNavIconClassName,
  imageNavNextClassName,
  imageNavPreviousClassName,
} from './classes'

export function ImageNav({
  direction,
  onClick,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
}) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight

  return (
    <ProButton
      variant="ghost"
      size="icon"
      prefix={<Icon className={imageNavIconClassName} />}
      className={cn(
        imageNavButtonClassName,
        direction === 'prev' ? imageNavPreviousClassName : imageNavNextClassName,
      )}
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
      aria-label={direction === 'prev' ? 'Previous image' : 'Next image'}
    />
  )
}
