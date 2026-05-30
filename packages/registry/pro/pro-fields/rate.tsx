'use client'

import { Star } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface RateProps extends Omit<React.ComponentProps<'div'>, 'value' | 'onChange'> {
  value?: number
  onChange?: (value: number) => void
  count?: number
  disabled?: boolean
}

export function Rate({ value = 0, onChange, count = 5, disabled, className, ...props }: RateProps) {
  const id = React.useId()
  const [hovered, setHovered] = React.useState<number | null>(null)
  const display = hovered ?? value

  return (
    <div className={cn('flex gap-0.5', className)} role="radiogroup" aria-label="Rating" {...props}>
      {Array.from({ length: count }, (_, i) => {
        const star = i + 1
        return (
          <label key={star} className="cursor-pointer p-0.5">
            <input
              type="radio"
              name={id}
              value={star}
              checked={value === star}
              disabled={disabled}
              aria-label={`${star} star`}
              className="sr-only"
              onChange={() => !disabled && onChange?.(star)}
            />
            <Star
              className={cn(
                'size-5 transition-colors',
                star <= display ? 'fill-primary text-primary' : 'text-muted-foreground',
              )}
              onMouseEnter={() => !disabled && setHovered(star)}
              onMouseLeave={() => setHovered(null)}
            />
          </label>
        )
      })}
    </div>
  )
}
