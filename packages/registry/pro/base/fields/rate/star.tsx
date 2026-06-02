import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  rateStarActiveClassName,
  rateStarDisabledClassName,
  rateStarIconClassName,
  rateStarInactiveClassName,
  rateStarInputClassName,
  rateStarLabelClassName,
} from './classes'
import type { RateStarProps } from './types'

export function RateStar({
  name,
  value,
  active,
  checked,
  disabled,
  onChange,
  onHover,
}: RateStarProps) {
  const label = `${value} ${value === 1 ? 'star' : 'stars'}`

  return (
    <label
      className={cn(rateStarLabelClassName, disabled && rateStarDisabledClassName)}
      onMouseEnter={() => !disabled && onHover(value)}
      onMouseLeave={() => onHover(null)}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        aria-label={label}
        className={rateStarInputClassName}
        onChange={() => !disabled && onChange?.(value)}
      />
      <Star
        className={cn(
          rateStarIconClassName,
          active ? rateStarActiveClassName : rateStarInactiveClassName,
        )}
      />
    </label>
  )
}
