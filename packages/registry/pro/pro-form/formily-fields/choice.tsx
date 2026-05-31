'use client'

import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Fragment } from 'react'
import { Checkbox, type CheckboxOption } from '../../pro-fields/checkbox'
import { Radio, type RadioOption } from '../../pro-fields/radio'
import { Segmented, type SegmentedOption } from '../../pro-fields/segmented'
import { Select, type SelectOption } from '../../pro-fields/select'
import { Switch } from '../../pro-fields/switch'
import { fieldDataSource, fieldPlaceholder, fieldValue } from './utils'

export const FormilyCheckbox = connect(
  Checkbox,
  mapProps((props, field) => ({
    ...props,
    disabled: field.disabled,
    value: props.value ?? fieldValue<boolean | string[]>(field),
    options: props.options ?? fieldDataSource<CheckboxOption>(field) ?? props.options,
  })),
  mapReadPretty(({ value, options = [] }) => {
    if (Array.isArray(value)) {
      const selectedOptions = (options as CheckboxOption[]).filter((item) =>
        value.includes(item.value),
      )
      return (
        <span className="text-sm">
          {selectedOptions.length
            ? selectedOptions.map((option, index) => (
                <Fragment key={option.value}>
                  {index > 0 ? ', ' : null}
                  {option.label}
                </Fragment>
              ))
            : '-'}
        </span>
      )
    }

    return <span className="text-sm">{value ? 'Yes' : 'No'}</span>
  }),
)
FormilyCheckbox.displayName = 'FormilyCheckbox'

export const FormilySwitch = connect(
  Switch,
  mapProps((props, field) => ({
    ...props,
    disabled: field.disabled,
    value: props.value ?? fieldValue<boolean>(field),
  })),
  mapReadPretty(({ value }) => <span className="text-sm">{value ? 'On' : 'Off'}</span>),
)
FormilySwitch.displayName = 'FormilySwitch'

export const FormilyRadio = connect(
  Radio,
  mapProps((props, field) => ({
    ...props,
    disabled: field.disabled,
    required: 'required' in field ? Boolean(field.required) : props.required,
    value: props.value ?? fieldValue<string>(field),
    options: props.options ?? fieldDataSource<RadioOption>(field) ?? [],
  })),
  mapReadPretty(({ value, options = [] }) => {
    const option = (options as RadioOption[]).find((item) => item.value === value)
    return <span className="text-sm">{option?.label ?? value ?? '-'}</span>
  }),
)
FormilyRadio.displayName = 'FormilyRadio'

export const FormilySelect = connect(
  Select,
  mapProps((props, field) => ({
    ...props,
    disabled: field.disabled,
    value: props.value ?? fieldValue<string | string[]>(field),
    options: props.options ?? fieldDataSource<SelectOption>(field) ?? [],
    placeholder: props.placeholder ?? fieldPlaceholder(field),
  })),
  mapReadPretty(({ value, options = [] }) => {
    if (Array.isArray(value)) {
      const selectedOptions = (options as SelectOption[]).filter((item) =>
        value.includes(item.value),
      )

      return (
        <span className="text-sm">
          {selectedOptions.length
            ? selectedOptions.map((option, index) => (
                <Fragment key={option.value}>
                  {index > 0 ? ', ' : null}
                  {option.label}
                </Fragment>
              ))
            : '-'}
        </span>
      )
    }

    const option = (options as SelectOption[]).find((item) => item.value === value)
    return <span className="text-sm">{option?.label ?? value ?? '-'}</span>
  }),
)
FormilySelect.displayName = 'FormilySelect'

export const FormilySegmented = connect(
  Segmented,
  mapProps((props, field) => ({
    ...props,
    disabled: field.disabled,
    value: props.value ?? fieldValue<string>(field),
    options: props.options ?? fieldDataSource<SegmentedOption>(field) ?? [],
  })),
  mapReadPretty(({ value, options = [] }) => {
    const option = (options as SegmentedOption[]).find((item) => item.value === value)
    return <span className="text-sm">{option?.label ?? value ?? '-'}</span>
  }),
)
FormilySegmented.displayName = 'FormilySegmented'
