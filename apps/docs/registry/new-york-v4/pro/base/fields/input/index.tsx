'use client'

import { forwardRef, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useComposedRef } from '../../hooks/use-composed-ref'
import { FieldClearButton, fieldControlClassName, fieldShellClassName } from '../shared/field'
import { type AffixSlot, InputAffix } from './affix'
import { inputControlClassName, inputDisabledShellClassName, inputShellClassName } from './classes'
import { shouldShowInputClear } from './clear'
import type { InputProps as BaseInputProps } from './types'
import { useInputAffix } from './use-input-affix'

export interface InputProps extends BaseInputProps {
  prefix?: AffixSlot
  suffix?: AffixSlot
  allowClear?: boolean
  onClear?: () => void
}

export type { InputValue } from './types'

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      prefix,
      suffix,
      allowClear = true,
      onClear,
      className,
      inputClassName,
      type,
      value,
      defaultValue,
      onChange,
      disabled,
      readOnly,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const composedRef = useComposedRef(inputRef, ref)

    const {
      currentValue,
      displayValue,
      selectedPrefixValue,
      selectedSuffixValue,
      emitValue,
      handleInputChange,
      handleAffixSelectChange,
    } = useInputAffix({
      prefix,
      suffix,
      value,
      defaultValue,
      onChange,
      inputRef,
    })
    const showClear = shouldShowInputClear({ allowClear, value: currentValue, disabled, readOnly })

    function handleClear() {
      onClear?.()
      emitValue('')
    }

    return (
      <div
        className={cn(
          fieldShellClassName,
          inputShellClassName,
          disabled && inputDisabledShellClassName,
          className,
        )}
      >
        <InputAffix
          affix={prefix}
          side="prefix"
          selectedValue={selectedPrefixValue}
          disabled={disabled || readOnly}
          onChange={handleAffixSelectChange}
        />

        <input
          ref={composedRef}
          type={type}
          data-slot="input"
          value={displayValue}
          onChange={handleInputChange}
          disabled={disabled}
          readOnly={readOnly}
          className={cn(inputControlClassName, fieldControlClassName, inputClassName)}
          {...props}
        />

        {showClear && (
          <FieldClearButton label="Clear input" className="ml-0" onClear={handleClear} />
        )}

        <InputAffix
          affix={suffix}
          side="suffix"
          selectedValue={selectedSuffixValue}
          disabled={disabled || readOnly}
          onChange={handleAffixSelectChange}
        />
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
