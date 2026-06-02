'use client'

import { forwardRef, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useComposedRef } from '../../hooks/use-composed-ref'
import { FieldClearButton } from '../shared/field'
import { shouldShowClear, useClearableField } from '../shared/use-clearable-field'
import {
  textareaClassName,
  textareaClearableClassName,
  textareaClearButtonClassName,
  textareaRootClassName,
} from './classes'
import type { TextareaProps } from './types'

export type { TextareaProps } from './types'

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      allowClear = true,
      onClear,
      className,
      value,
      defaultValue,
      onChange,
      disabled,
      readOnly,
      ...props
    },
    ref,
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const composedRef = useComposedRef(textareaRef, ref)

    const { currentValue, inputValue, handleChange, clear } =
      useClearableField<HTMLTextAreaElement>({
        value,
        defaultValue,
        onChange,
        onClear,
        fieldRef: textareaRef,
      })
    const showClear = shouldShowClear({ allowClear, value: currentValue, disabled, readOnly })

    return (
      <div className={textareaRootClassName}>
        <textarea
          ref={composedRef}
          data-slot="textarea"
          value={inputValue}
          onChange={handleChange}
          disabled={disabled}
          readOnly={readOnly}
          className={cn(textareaClassName, showClear && textareaClearableClassName, className)}
          {...props}
        />
        {showClear && (
          <FieldClearButton
            label="Clear textarea"
            onClear={clear}
            className={textareaClearButtonClassName}
          />
        )}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

export { Textarea }
