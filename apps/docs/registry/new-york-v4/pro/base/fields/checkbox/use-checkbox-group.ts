import { useState } from 'react'
import type { CheckboxBaseProps } from './types'

export function useCheckboxGroup({
  value,
  defaultValue,
  onChange,
}: Pick<CheckboxBaseProps, 'value' | 'defaultValue' | 'onChange'>) {
  const controlled = Array.isArray(value)
  const defaultSelectedValues = Array.isArray(defaultValue) ? defaultValue : undefined
  const [internalValues, setInternalValues] = useState<string[]>(defaultSelectedValues ?? [])
  const values = controlled ? value : internalValues

  function commit(next: string[]) {
    if (!controlled) setInternalValues(next)
    onChange?.(next)
  }

  return {
    values: values ?? [],
    commit,
  }
}
