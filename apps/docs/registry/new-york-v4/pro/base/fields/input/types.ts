import type { ChangeEventHandler, InputHTMLAttributes } from 'react'

export type InputValue = string | number | readonly string[]

export interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'children' | 'className' | 'defaultValue' | 'onChange' | 'prefix' | 'value'
  > {
  value?: InputValue
  defaultValue?: InputValue
  onChange?: ChangeEventHandler<HTMLInputElement>
  className?: string
  inputClassName?: string
}
