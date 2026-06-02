'use client'

import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Captcha, VisualCaptcha } from '../../base/fields/captcha'
import { Input } from '../../base/fields/input'
import { Password } from '../../base/fields/password'
import { Textarea } from '../../base/fields/textarea'
import { readPrettyTextareaClassName } from './classes'
import { fieldBaseProps } from './field'
import { ReadPrettyText } from './read-pretty'

export const FormilyInput = connect(
  Input,
  mapProps((props, field) => ({
    ...props,
    ...fieldBaseProps(props, field),
  })),
  mapReadPretty(({ value }: { value?: string }) => <ReadPrettyText value={value} />),
)
FormilyInput.displayName = 'FormilyInput'

export const FormilyPassword = connect(
  Password,
  mapProps((props, field) => ({
    ...props,
    ...fieldBaseProps(props, field, 'Enter password'),
  })),
  mapReadPretty(() => <ReadPrettyText value="••••••••" />),
)
FormilyPassword.displayName = 'FormilyPassword'

export const FormilyTextarea = connect(
  Textarea,
  mapProps((props, field) => ({
    ...props,
    ...fieldBaseProps(props, field),
  })),
  mapReadPretty(({ value }: { value?: string }) => (
    <ReadPrettyText className={readPrettyTextareaClassName} value={value} />
  )),
)
FormilyTextarea.displayName = 'FormilyTextarea'

export const FormilyCaptcha = connect(
  Captcha,
  mapProps((props, field) => ({
    ...props,
    ...fieldBaseProps(props, field),
  })),
  mapReadPretty(() => <ReadPrettyText value="••••" />),
)
FormilyCaptcha.displayName = 'FormilyCaptcha'

export const FormilyVisualCaptcha = connect(
  VisualCaptcha,
  mapProps((props, field) => ({
    ...props,
    ...fieldBaseProps(props, field),
  })),
  mapReadPretty(() => <ReadPrettyText value="••••" />),
)
FormilyVisualCaptcha.displayName = 'FormilyVisualCaptcha'
