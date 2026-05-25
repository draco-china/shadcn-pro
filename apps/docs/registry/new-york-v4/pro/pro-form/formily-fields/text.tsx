'use client'

import { connect, mapProps, mapReadPretty } from '@formily/react'
import { CaptchaBase } from '../../pro-fields/captcha'
import { Input } from '../../pro-fields/input'
import { Password } from '../../pro-fields/password'
import { TextareaBase } from '../../pro-fields/textarea'
import { fieldPlaceholder } from './utils'

export const FormilyInput = connect(
  Input,
  mapProps((props, field) => ({
    ...props,
    id: field.path.toString(),
    disabled: field.disabled,
    readOnly: field.readOnly,
    placeholder: props.placeholder ?? fieldPlaceholder(field),
  })),
  mapReadPretty(({ value }) => <span className="text-sm">{value ?? '-'}</span>),
)
FormilyInput.displayName = 'FormilyInput'

export const FormilyPassword = connect(
  Password,
  mapProps((props, field) => ({
    ...props,
    id: field.path.toString(),
    disabled: field.disabled,
    readOnly: field.readOnly,
    placeholder: props.placeholder ?? fieldPlaceholder(field) ?? 'Enter password',
  })),
  mapReadPretty(() => <span className="text-sm">••••••••</span>),
)
FormilyPassword.displayName = 'FormilyPassword'

export const FormilyTextarea = connect(
  TextareaBase,
  mapProps((props, field) => ({
    ...props,
    id: field.path.toString(),
    disabled: field.disabled,
    readOnly: field.readOnly,
    placeholder: props.placeholder ?? fieldPlaceholder(field),
  })),
  mapReadPretty(({ value }) => <span className="whitespace-pre-wrap text-sm">{value ?? '-'}</span>),
)
FormilyTextarea.displayName = 'FormilyTextarea'

export const FormilyCaptcha = connect(
  CaptchaBase,
  mapProps((props, field) => ({
    ...props,
    disabled: field.disabled,
    placeholder: props.placeholder ?? fieldPlaceholder(field),
  })),
  mapReadPretty(() => <span className="text-sm">••••</span>),
)
FormilyCaptcha.displayName = 'FormilyCaptcha'
