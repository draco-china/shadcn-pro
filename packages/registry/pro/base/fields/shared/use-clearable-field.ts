'use client'

import { type ChangeEvent, type MouseEvent, type RefObject, useState } from 'react'
import { createFieldChangeEvent } from './change-event'

type ClearableElement = HTMLInputElement | HTMLTextAreaElement
type ClearableValue = string | number | readonly string[]

function hasClearableValue(value: unknown) {
  return value !== '' && value !== undefined && value !== null
}

export function shouldShowClear({
  allowClear,
  value,
  disabled,
  readOnly,
}: {
  allowClear: boolean | undefined
  value: unknown
  disabled?: boolean
  readOnly?: boolean
}) {
  return !!allowClear && hasClearableValue(value) && !disabled && !readOnly
}

interface UseClearableFieldProps<TElement extends ClearableElement> {
  value?: ClearableValue
  defaultValue?: ClearableValue
  onChange?: (event: ChangeEvent<TElement>) => void
  onClear?: () => void
  fieldRef: RefObject<TElement | null>
}

export function useClearableField<TElement extends ClearableElement>({
  value,
  defaultValue,
  onChange,
  onClear,
  fieldRef,
}: UseClearableFieldProps<TElement>) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  function handleChange(event: ChangeEvent<TElement>) {
    if (!isControlled) setInternalValue(event.target.value)
    onChange?.(event)
  }

  function clear(event: MouseEvent<HTMLButtonElement>) {
    if (!isControlled) setInternalValue('')
    onClear?.()

    const field = fieldRef.current
    if (!field) return

    field.value = ''
    onChange?.(createFieldChangeEvent(field, event))
  }

  return {
    currentValue,
    inputValue: isControlled ? value : internalValue,
    handleChange,
    clear,
  }
}
