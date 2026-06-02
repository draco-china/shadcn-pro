'use client'

import { connect, mapProps, mapReadPretty } from '@formily/react'
import { DatePicker } from '../../base/fields/date-picker'
import { DateRangePicker, type DateRangeValue } from '../../base/fields/date-range-picker'
import { DateTimePicker } from '../../base/fields/date-time-picker'
import { formatDate, formatDateRange } from '../../base/fields/shared/date'
import { TimePicker } from '../../base/fields/time-picker'
import { toDate } from './date-value'
import { fieldDisabledOrProp, fieldPlaceholderOrProp, fieldValueOrProp } from './field'
import { ReadPrettyText } from './read-pretty'

export const FormilyDatePicker = connect(
  DatePicker,
  mapProps((props, field) => ({
    ...props,
    value: toDate(fieldValueOrProp<Date | string>(props, field)),
    disabled: fieldDisabledOrProp(props, field),
    placeholder: fieldPlaceholderOrProp(props, field),
  })),
  mapReadPretty(({ value, dateFormat }: { value?: Date; dateFormat?: string }) => (
    <ReadPrettyText value={value ? formatDate(value, dateFormat ?? 'PPP') : undefined} />
  )),
)
FormilyDatePicker.displayName = 'FormilyDatePicker'

export const FormilyDateRangePicker = connect(
  DateRangePicker,
  mapProps((props, field) => ({
    ...props,
    disabled: fieldDisabledOrProp(props, field),
    value: fieldValueOrProp<DateRangeValue>(props, field),
    placeholder: fieldPlaceholderOrProp(props, field),
  })),
  mapReadPretty(({ value }: { value?: DateRangeValue }) => (
    <ReadPrettyText value={formatDateRange(value?.from, value?.to)} />
  )),
)
FormilyDateRangePicker.displayName = 'FormilyDateRangePicker'

export const FormilyDateTimePicker = connect(
  DateTimePicker,
  mapProps((props, field) => ({
    ...props,
    value: toDate(fieldValueOrProp<Date | string>(props, field)),
    disabled: fieldDisabledOrProp(props, field),
    placeholder: fieldPlaceholderOrProp(props, field),
  })),
  mapReadPretty(({ value }: { value?: Date }) => (
    <ReadPrettyText value={value ? formatDate(value, 'PPP HH:mm:ss') : undefined} />
  )),
)
FormilyDateTimePicker.displayName = 'FormilyDateTimePicker'

export const FormilyTimePicker = connect(
  TimePicker,
  mapProps((props, field) => ({
    ...props,
    disabled: fieldDisabledOrProp(props, field),
    value: fieldValueOrProp<string>(props, field),
  })),
  mapReadPretty(({ value }: { value?: string }) => <ReadPrettyText value={value} />),
)
FormilyTimePicker.displayName = 'FormilyTimePicker'
