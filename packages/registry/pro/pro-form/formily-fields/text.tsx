'use client'

import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Captcha } from '../../pro-fields/captcha'
import { Input } from '../../pro-fields/input'
import { Password } from '../../pro-fields/password'
import { Textarea } from '../../pro-fields/textarea'
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
  Textarea,
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
  Captcha,
  mapProps((props, field) => ({
    ...props,
    disabled: field.disabled,
    placeholder: props.placeholder ?? fieldPlaceholder(field),
  })),
  mapReadPretty(() => <span className="text-sm">••••</span>),
)
FormilyCaptcha.displayName = 'FormilyCaptcha'
