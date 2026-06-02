'use client'

import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Cascader, type CascaderOption } from '../../base/fields/cascader'
import { TreeSelect, type TreeSelectOption } from '../../base/fields/tree-select'
import { Upload, type UploadFile } from '../../base/fields/upload'
import {
  fieldDisabledOrProp,
  fieldOptionsOrProp,
  fieldPlaceholderOrProp,
  fieldRequiredOrProp,
  fieldValueOrProp,
} from './field'
import { getCascaderLabel, getTreeSelectLabels } from './labels'
import { ReadPrettyText } from './read-pretty'
import { UploadReadPretty } from './upload-read-pretty'

export const FormilyCascader = connect(
  Cascader,
  mapProps((props, field) => ({
    ...props,
    disabled: fieldDisabledOrProp(props, field),
    required: fieldRequiredOrProp(props, field),
    value: fieldValueOrProp<string[]>(props, field),
    options: fieldOptionsOrProp<CascaderOption>(props, field),
    placeholder: fieldPlaceholderOrProp(props, field),
  })),
  mapReadPretty(({ value, options }: { value?: string[]; options?: CascaderOption[] }) => (
    <ReadPrettyText value={getCascaderLabel(options, value) || undefined} />
  )),
)
FormilyCascader.displayName = 'FormilyCascader'

export const FormilyTreeSelect = connect(
  TreeSelect,
  mapProps((props, field) => ({
    ...props,
    disabled: fieldDisabledOrProp(props, field),
    required: fieldRequiredOrProp(props, field),
    value: fieldValueOrProp<string[]>(props, field),
    options: fieldOptionsOrProp<TreeSelectOption>(props, field),
    placeholder: fieldPlaceholderOrProp(props, field),
  })),
  mapReadPretty(({ value, options }: { value?: string[]; options?: TreeSelectOption[] }) => (
    <ReadPrettyText value={getTreeSelectLabels(options, value) || undefined} />
  )),
)
FormilyTreeSelect.displayName = 'FormilyTreeSelect'

export const FormilyUpload = connect(
  Upload,
  mapProps((props, field) => ({
    ...props,
    disabled: fieldDisabledOrProp(props, field),
    value: fieldValueOrProp<UploadFile[]>(props, field),
  })),
  mapReadPretty(({ value }: { value?: UploadFile[] }) => <UploadReadPretty files={value} />),
)
FormilyUpload.displayName = 'FormilyUpload'
