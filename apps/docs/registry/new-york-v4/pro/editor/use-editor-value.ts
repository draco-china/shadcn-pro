'use client'

import { useCallback, useEffect, useState } from 'react'
import type { EditorProps } from './types'

export function useEditorValue({
  value,
  onChange,
  disabled,
}: Pick<EditorProps, 'value' | 'onChange' | 'disabled'>) {
  const [localValue, setLocalValue] = useState(value ?? '')

  useEffect(() => {
    setLocalValue(value ?? '')
  }, [value])

  const handleChange = useCallback(
    (nextValue: string) => {
      if (disabled) return
      setLocalValue(nextValue)
      onChange?.(nextValue)
    },
    [disabled, onChange],
  )

  return { localValue, handleChange }
}
