import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { DigitRangeValue } from '../../base/fields/digit-range'
import { isValidNumber } from '../../base/fields/shared/number'
import {
  readPrettyMoneyClassName,
  readPrettyRateActiveClassName,
  readPrettyRateClassName,
  readPrettyRateIconClassName,
  readPrettyRateInactiveClassName,
} from './classes'
import { formatMoney } from './format'
import { ReadPrettyText } from './read-pretty'

export function ReadPrettyDigitRange({ value }: { value?: DigitRangeValue }) {
  const hasValue = isValidNumber(value?.min) || isValidNumber(value?.max)

  return (
    <ReadPrettyText value={hasValue ? `${value?.min ?? '∞'} ~ ${value?.max ?? '∞'}` : undefined} />
  )
}

export function ReadPrettySlider({ value, min }: { value?: number; min?: number }) {
  return <ReadPrettyText value={value ?? min ?? 0} />
}

export function ReadPrettyRate({ value, count }: { value?: number; count?: number }) {
  return (
    <div className={readPrettyRateClassName}>
      {Array.from({ length: count ?? 5 }, (_, index) => index + 1).map((star) => (
        <Star
          key={star}
          className={cn(
            readPrettyRateIconClassName,
            star <= (value ?? 0) ? readPrettyRateActiveClassName : readPrettyRateInactiveClassName,
          )}
        />
      ))}
    </div>
  )
}

export function ReadPrettyMoney({
  value,
  currency,
  precision,
}: {
  value?: number
  currency?: string
  precision?: number
}) {
  return (
    <span className={readPrettyMoneyClassName}>
      {value !== undefined && value !== null
        ? formatMoney(value, precision ?? 2, currency ?? '$')
        : '-'}
    </span>
  )
}
