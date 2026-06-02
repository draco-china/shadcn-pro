'use client'

import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Digit } from '../../base/fields/digit'
import { DigitRange, type DigitRangeValue } from '../../base/fields/digit-range'
import { Money } from '../../base/fields/money'
import { Rate } from '../../base/fields/rate'
import { Slider } from '../../base/fields/slider'
import { fieldDisabledOrProp, fieldPlaceholderOrProp, fieldValueOrProp } from './field'
import {
  ReadPrettyDigitRange,
  ReadPrettyMoney,
  ReadPrettyRate,
  ReadPrettySlider,
} from './numeric-read-pretty'
import { ReadPrettyText } from './read-pretty'

export const FormilyDigit = connect(
  Digit,
  mapProps((props, field) => ({
    ...props,
    disabled: fieldDisabledOrProp(props, field),
    value: fieldValueOrProp<number>(props, field),
    placeholder: fieldPlaceholderOrProp(props, field),
  })),
  mapReadPretty(({ value }: { value?: number }) => <ReadPrettyText value={value} />),
)
FormilyDigit.displayName = 'FormilyDigit'

export const FormilyDigitRange = connect(
  DigitRange,
  mapProps((props, field) => ({
    ...props,
    disabled: fieldDisabledOrProp(props, field),
    value: fieldValueOrProp<DigitRangeValue>(props, field),
  })),
  mapReadPretty(ReadPrettyDigitRange),
)
FormilyDigitRange.displayName = 'FormilyDigitRange'

export const FormilySlider = connect(
  Slider,
  mapProps((props, field) => ({
    ...props,
    disabled: fieldDisabledOrProp(props, field),
    value: fieldValueOrProp<number>(props, field),
  })),
  mapReadPretty(ReadPrettySlider),
)
FormilySlider.displayName = 'FormilySlider'

export const FormilyRate = connect(
  Rate,
  mapProps((props, field) => ({
    ...props,
    disabled: fieldDisabledOrProp(props, field),
    value: fieldValueOrProp<number>(props, field),
  })),
  mapReadPretty(ReadPrettyRate),
)
FormilyRate.displayName = 'FormilyRate'

export const FormilyMoney = connect(
  Money,
  mapProps((props, field) => ({
    ...props,
    disabled: fieldDisabledOrProp(props, field),
    value: fieldValueOrProp<number>(props, field),
    placeholder: fieldPlaceholderOrProp(props, field),
  })),
  mapReadPretty(ReadPrettyMoney),
)
FormilyMoney.displayName = 'FormilyMoney'
