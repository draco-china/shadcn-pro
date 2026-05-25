'use client'

import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DigitBase } from '../../pro-fields/digit'
import { DigitRangeBase, type DigitRangeValue } from '../../pro-fields/digit-range'
import { MoneyBase } from '../../pro-fields/money'
import { RateBase } from '../../pro-fields/rate'
import { SliderBase } from '../../pro-fields/slider'
import { fieldPlaceholder, fieldValue, formatMoney } from './utils'

export const FormilyDigit = connect(
  DigitBase,
  mapProps((props, field) => ({
    ...props,
    disabled: field.disabled,
    value: props.value ?? fieldValue<number>(field),
    placeholder: props.placeholder ?? fieldPlaceholder(field),
  })),
  mapReadPretty(({ value }) => <span className="text-sm">{value ?? '-'}</span>),
)
FormilyDigit.displayName = 'FormilyDigit'

export const FormilyDigitRange = connect(
  DigitRangeBase,
  mapProps((props, field) => ({
    ...props,
    disabled: field.disabled,
    value: props.value ?? fieldValue<DigitRangeValue>(field),
  })),
  mapReadPretty(({ value }) => {
    const range = value as DigitRangeValue | undefined
    return (
      <span className="text-sm">{range ? `${range.min ?? '∞'} ~ ${range.max ?? '∞'}` : '-'}</span>
    )
  }),
)
FormilyDigitRange.displayName = 'FormilyDigitRange'

export const FormilySlider = connect(
  SliderBase,
  mapProps((props, field) => ({
    ...props,
    disabled: field.disabled,
    value: props.value ?? fieldValue<number>(field),
  })),
  mapReadPretty(({ value, min = 0 }) => <span className="text-sm">{value ?? min}</span>),
)
FormilySlider.displayName = 'FormilySlider'

export const FormilyRate = connect(
  RateBase,
  mapProps((props, field) => ({
    ...props,
    disabled: field.disabled,
    value: props.value ?? fieldValue<number>(field),
  })),
  mapReadPretty(({ value = 0, count = 5 }) => (
    <div className="flex gap-0.5">
      {Array.from({ length: count as number }, (_, index) => index + 1).map((star) => (
        <Star
          key={star}
          className={cn(
            'h-4 w-4',
            star <= (value as number) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground',
          )}
        />
      ))}
    </div>
  )),
)
FormilyRate.displayName = 'FormilyRate'

export const FormilyMoney = connect(
  MoneyBase,
  mapProps((props, field) => ({
    ...props,
    disabled: field.disabled,
    value: props.value ?? fieldValue<number>(field),
    placeholder: props.placeholder ?? fieldPlaceholder(field),
  })),
  mapReadPretty(({ value, currency = '$', precision = 2 }) => (
    <span className="font-mono text-sm">
      {value !== undefined && value !== null
        ? formatMoney(value as number, precision as number, currency as string)
        : '-'}
    </span>
  )),
)
FormilyMoney.displayName = 'FormilyMoney'
