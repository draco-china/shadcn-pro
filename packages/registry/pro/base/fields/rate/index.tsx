'use client'

import { useId, useState } from 'react'
import { cn } from '@/lib/utils'
import { rateRootClassName } from './classes'
import { RateStar } from './star'
import type { RateProps } from './types'

export type { RateProps } from './types'

export function Rate({
  value = 0,
  onChange,
  count = 5,
  disabled,
  className,
  'aria-label': ariaLabel = 'Rating',
}: RateProps) {
  const id = useId()
  const [hovered, setHovered] = useState<number | null>(null)
  const display = hovered ?? value

  return (
    <div className={cn(rateRootClassName, className)} role="radiogroup" aria-label={ariaLabel}>
      {Array.from({ length: count }, (_, i) => {
        const star = i + 1

        return (
          <RateStar
            key={star}
            name={id}
            value={star}
            checked={value === star}
            active={star <= display}
            disabled={disabled}
            onChange={onChange}
            onHover={setHovered}
          />
        )
      })}
    </div>
  )
}
