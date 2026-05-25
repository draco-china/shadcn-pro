'use client'

import { connect, mapProps, mapReadPretty } from '@formily/react'
import { CascaderBase, type CascaderOption } from '../../pro-fields/cascader'
import { TreeSelectBase, type TreeSelectOption } from '../../pro-fields/tree-select'
import { UploadBase, type UploadFile } from '../../pro-fields/upload'
import {
  fieldDataSource,
  fieldPlaceholder,
  fieldValue,
  getCascaderLabel,
  getTreeSelectLabels,
} from './utils'

export const FormilyCascader = connect(
  CascaderBase,
  mapProps((props, field) => ({
    ...props,
    disabled: field.disabled,
    required: 'required' in field ? Boolean(field.required) : props.required,
    value: props.value ?? fieldValue<string[]>(field) ?? [],
    options: props.options ?? fieldDataSource<CascaderOption>(field) ?? [],
    placeholder: props.placeholder ?? fieldPlaceholder(field),
  })),
  mapReadPretty(({ value = [], options = [] }) => {
    const label = getCascaderLabel(options as CascaderOption[], value as string[])
    return <span className="text-sm">{label || '-'}</span>
  }),
)
FormilyCascader.displayName = 'FormilyCascader'

export const FormilyTreeSelect = connect(
  TreeSelectBase,
  mapProps((props, field) => ({
    ...props,
    disabled: field.disabled,
    required: 'required' in field ? Boolean(field.required) : props.required,
    value: props.value ?? fieldValue<string[]>(field) ?? [],
    options: props.options ?? fieldDataSource<TreeSelectOption>(field) ?? [],
    placeholder: props.placeholder ?? fieldPlaceholder(field),
  })),
  mapReadPretty(({ value = [], options = [] }) => {
    const label = getTreeSelectLabels(options as TreeSelectOption[], value as string[])
    return <span className="text-sm">{label || '-'}</span>
  }),
)
FormilyTreeSelect.displayName = 'FormilyTreeSelect'

export const FormilyUpload = connect(
  UploadBase,
  mapProps((props, field) => ({
    ...props,
    disabled: field.disabled,
    value: props.value ?? fieldValue<UploadFile[]>(field) ?? [],
  })),
  mapReadPretty(({ value = [] }) => (
    <div className="flex flex-wrap gap-1">
      {(value as UploadFile[]).length === 0 && <span className="text-sm">-</span>}
      {(value as UploadFile[]).map((file) => (
        <span key={file.uid} className="text-sm text-blue-600 underline">
          {file.url ? (
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
          ) : (
            file.name
          )}
        </span>
      ))}
    </div>
  )),
)
FormilyUpload.displayName = 'FormilyUpload'
