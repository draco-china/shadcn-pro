'use client'

import type { MouseEvent } from 'react'
import { ProCommandMenu } from '@/components/pro/base/command-menu'
import { cn } from '@/lib/utils'
import { selectCommandContentClassName, selectRootClassName } from './classes'
import { MultiSelectTrigger } from './multi-trigger'
import type { SelectProps } from './types'
import type { useSelect } from './use-select'

export function MultiSelectView({
  select,
  placeholder,
  disabled,
  searchable,
  searchPlaceholder,
  emptyText,
  maxTagCount,
  size,
  className,
  triggerClassName,
  contentClassName,
  showClear,
  onClear,
}: Pick<
  SelectProps,
  | 'placeholder'
  | 'disabled'
  | 'searchable'
  | 'searchPlaceholder'
  | 'emptyText'
  | 'maxTagCount'
  | 'size'
  | 'className'
  | 'triggerClassName'
  | 'contentClassName'
> & {
  select: ReturnType<typeof useSelect>
  showClear: boolean
  onClear: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <div className={cn(selectRootClassName, className)}>
      <ProCommandMenu
        open={select.open}
        onOpenChange={select.setOpen}
        contentClassName={cn(selectCommandContentClassName, contentClassName)}
        searchable={searchable}
        placeholder={searchPlaceholder ?? placeholder}
        emptyText={emptyText}
        options={select.commandOptions}
        trigger={
          <MultiSelectTrigger
            selectedOptions={select.selectedOptions}
            placeholder={placeholder}
            maxTagCount={maxTagCount ?? 2}
            disabled={disabled}
            showClear={showClear}
            open={select.open}
            size={size}
            triggerClassName={triggerClassName}
            onClear={onClear}
          />
        }
      />
    </div>
  )
}
