'use client'

import type { MouseEvent } from 'react'
import { cn } from '@/lib/utils'
import { FieldSelect } from '../shared/select'
import { selectRootClassName } from './classes'
import { SingleSelectContent } from './content'
import { SingleSelectTrigger } from './single-trigger'
import type { SelectProps } from './types'
import type { useSelect } from './use-select'

export function SingleSelectView({
  select,
  options,
  placeholder,
  disabled,
  required,
  size,
  className,
  triggerClassName,
  contentClassName,
  showClear,
  onClear,
}: Pick<
  SelectProps,
  | 'options'
  | 'placeholder'
  | 'disabled'
  | 'required'
  | 'size'
  | 'className'
  | 'triggerClassName'
  | 'contentClassName'
> & {
  select: ReturnType<typeof useSelect>
  showClear: boolean
  onClear: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  const selectedOption = options?.find((option) => option.value === select.currentValue)

  return (
    <div className={cn(selectRootClassName, className)}>
      <FieldSelect
        value={typeof select.currentValue === 'string' ? select.currentValue : undefined}
        onValueChange={select.handleChange}
        disabled={disabled}
        required={required}
      >
        <SingleSelectTrigger
          selectedOption={selectedOption}
          hasValue={select.selectedValues.length > 0}
          placeholder={placeholder}
          disabled={disabled}
          showClear={showClear}
          size={size}
          triggerClassName={triggerClassName}
          onClear={onClear}
        />
        <SingleSelectContent options={options} contentClassName={contentClassName} />
      </FieldSelect>
    </div>
  )
}
