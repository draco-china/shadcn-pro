'use client'

import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Checkbox, type CheckboxOption } from '../../base/fields/checkbox'
import { Radio, type RadioOption } from '../../base/fields/radio'
import { Segmented, type SegmentedOption } from '../../base/fields/segmented'
import { Select, type SelectOption } from '../../base/fields/select'
import { Switch } from '../../base/fields/switch'
import {
  ReadPrettyCheckbox,
  ReadPrettyRadio,
  ReadPrettySegmented,
  ReadPrettySelect,
  ReadPrettySwitch,
} from './choice-read-pretty'
import {
  fieldDisabledOrProp,
  fieldOptionsOrProp,
  fieldPlaceholderOrProp,
  fieldRequiredOrProp,
  fieldValueOrProp,
} from './field'

export const FormilyCheckbox = connect(
  Checkbox,
  mapProps((props, field) => ({
    ...props,
    disabled: fieldDisabledOrProp(props, field),
    value: fieldValueOrProp<boolean | string[]>(props, field),
    options: fieldOptionsOrProp<CheckboxOption>(props, field),
  })),
  mapReadPretty(ReadPrettyCheckbox),
)
FormilyCheckbox.displayName = 'FormilyCheckbox'

export const FormilySwitch = connect(
  Switch,
  mapProps((props, field) => ({
    ...props,
    disabled: fieldDisabledOrProp(props, field),
    value: fieldValueOrProp<boolean>(props, field),
  })),
  mapReadPretty(ReadPrettySwitch),
)
FormilySwitch.displayName = 'FormilySwitch'

export const FormilyRadio = connect(
  Radio,
  mapProps((props, field) => ({
    ...props,
    disabled: fieldDisabledOrProp(props, field),
    required: fieldRequiredOrProp(props, field),
    value: fieldValueOrProp<string>(props, field),
    options: fieldOptionsOrProp<RadioOption>(props, field),
  })),
  mapReadPretty(ReadPrettyRadio),
)
FormilyRadio.displayName = 'FormilyRadio'

export const FormilySelect = connect(
  Select,
  mapProps((props, field) => ({
    ...props,
    disabled: fieldDisabledOrProp(props, field),
    value: fieldValueOrProp<string | string[]>(props, field),
    options: fieldOptionsOrProp<SelectOption>(props, field),
    placeholder: fieldPlaceholderOrProp(props, field),
  })),
  mapReadPretty(ReadPrettySelect),
)
FormilySelect.displayName = 'FormilySelect'

export const FormilySegmented = connect(
  Segmented,
  mapProps((props, field) => ({
    ...props,
    disabled: fieldDisabledOrProp(props, field),
    value: fieldValueOrProp<string>(props, field),
    options: fieldOptionsOrProp<SegmentedOption>(props, field),
  })),
  mapReadPretty(ReadPrettySegmented),
)
FormilySegmented.displayName = 'FormilySegmented'
