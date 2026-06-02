'use client'

import { type ChangeEvent, type ChangeEventHandler, type RefObject, useState } from 'react'
import { createFieldChangeEvent } from '../shared/change-event'
import type { InputValue } from './types'

export function useInputValue({
  value,
  defaultValue,
  onChange,
  inputRef,
}: {
  value?: InputValue
  defaultValue?: InputValue
  onChange?: ChangeEventHandler<HTMLInputElement>
  inputRef: RefObject<HTMLInputElement | null>
}) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  function emitValue(nextValue: string, event?: ChangeEvent<HTMLInputElement>) {
    if (!isControlled) setInternalValue(nextValue)
    const inputEl = inputRef.current
    if (!inputEl) return

    inputEl.value = nextValue
    onChange?.(createFieldChangeEvent(inputEl, event))
  }

  return { currentValue, emitValue }
}
