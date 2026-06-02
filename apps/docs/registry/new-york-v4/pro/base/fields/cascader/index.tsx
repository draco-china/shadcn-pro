'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  fieldAutoPopoverContentClassName,
  fieldInlineTriggerLabelClassName,
  fieldRelativeRootClassName,
} from '../shared/field'
import { FieldPopover, FieldPopoverContent, FieldPopoverTriggerRoot } from '../shared/popover'
import { FieldPopoverClear, FieldPopoverTrigger } from '../shared/trigger'
import { CascaderPanel } from './panel'
import type { CascaderProps } from './types'
import { getCascaderLabel } from './utils'

export type { CascaderOption, CascaderProps } from './types'

export function Cascader({
  value = [],
  onChange,
  options,
  placeholder = 'Select...',
  disabled,
  required,
  allowClear = true,
  size = 'default',
  className,
}: CascaderProps) {
  const [open, setOpen] = useState(false)
  const hasValue = value.length > 0
  const label = value.length ? getCascaderLabel(options, value) : null
  const showClear = allowClear && hasValue && !disabled && !required

  function handleClear() {
    onChange?.([])
    setOpen(false)
  }

  return (
    <FieldPopover open={open} onOpenChange={setOpen}>
      <div className={cn(fieldRelativeRootClassName, className)}>
        <FieldPopoverTriggerRoot asChild>
          <FieldPopoverTrigger
            size={size}
            disabled={disabled}
            aria-expanded={open}
            hasValue={hasValue}
            showClear={showClear}
          >
            <span className={fieldInlineTriggerLabelClassName}>{label ?? placeholder}</span>
          </FieldPopoverTrigger>
        </FieldPopoverTriggerRoot>
        <FieldPopoverClear showClear={showClear} label="Clear selection" onClear={handleClear} />
      </div>
      <FieldPopoverContent className={fieldAutoPopoverContentClassName} align="start">
        <CascaderPanel
          options={options}
          path={value}
          onSelect={(path) => {
            onChange?.(path)
            setOpen(false)
          }}
        />
      </FieldPopoverContent>
    </FieldPopover>
  )
}
