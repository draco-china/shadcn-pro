'use client'

import { connect, mapProps, mapReadPretty } from '@formily/react'
import { format } from 'date-fns'
import { DatePickerBase } from '../../pro-fields/date-picker'
import { DateRangePickerBase, type DateRangeValue } from '../../pro-fields/date-range-picker'
import { DateTimePickerBase } from '../../pro-fields/date-time-picker'
import { TimePickerBase } from '../../pro-fields/time-picker'
import { fieldPlaceholder, fieldValue, toDate } from './utils'

export const FormilyDatePicker = connect(
  DatePickerBase,
  mapProps((props, field) => ({
    ...props,
    value: toDate(props.value ?? fieldValue<Date | string>(field)),
    disabled: field.disabled,
    placeholder: props.placeholder ?? fieldPlaceholder(field),
  })),
  mapReadPretty(({ value, dateFormat = 'PPP' }) => (
    <span className="text-sm">{value ? format(value as Date, dateFormat as string) : '-'}</span>
  )),
)
FormilyDatePicker.displayName = 'FormilyDatePicker'

export const FormilyDateRangePicker = connect(
  DateRangePickerBase,
  mapProps((props, field) => ({
    ...props,
    disabled: field.disabled,
    value: props.value ?? fieldValue<DateRangeValue>(field),
    placeholder: props.placeholder ?? fieldPlaceholder(field),
  })),
  mapReadPretty(({ value }) => {
    const range = value as DateRangeValue | undefined
    return (
      <span className="text-sm">
        {range?.from
          ? `${format(range.from, 'LLL dd, y')}${range.to ? ` - ${format(range.to, 'LLL dd, y')}` : ''}`
          : '-'}
      </span>
    )
  }),
)
FormilyDateRangePicker.displayName = 'FormilyDateRangePicker'

export const FormilyDateTimePicker = connect(
  DateTimePickerBase,
  mapProps((props, field) => ({
    ...props,
    value: toDate(props.value ?? fieldValue<Date | string>(field)),
    disabled: field.disabled,
    placeholder: props.placeholder ?? fieldPlaceholder(field),
  })),
  mapReadPretty(({ value }) => (
    <span className="text-sm">{value ? format(value as Date, 'PPP HH:mm:ss') : '-'}</span>
  )),
)
FormilyDateTimePicker.displayName = 'FormilyDateTimePicker'

export const FormilyTimePicker = connect(
  TimePickerBase,
  mapProps((props, field) => ({
    ...props,
    disabled: field.disabled,
    value: props.value ?? fieldValue<string>(field),
  })),
  mapReadPretty(({ value }) => <span className="text-sm">{value ?? '-'}</span>),
)
FormilyTimePicker.displayName = 'FormilyTimePicker'
