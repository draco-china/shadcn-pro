'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { fieldInlineTriggerLabelClassName, fieldRelativeRootClassName } from '../shared/field'
import { FieldPopover, FieldPopoverContent, FieldPopoverTriggerRoot } from '../shared/popover'
import { FieldPopoverClear, FieldPopoverTrigger } from '../shared/trigger'
import { treeSelectContentClassName, treeSelectListClassName } from './classes'
import { TreeNode } from './tree-node'
import type { TreeSelectProps } from './types'
import { getTreeSelectLabels } from './utils'

export type { TreeSelectOption, TreeSelectProps } from './types'

export function TreeSelect({
  value = [],
  onChange,
  options = [],
  placeholder = 'Select...',
  disabled,
  required,
  allowClear = true,
  size = 'default',
  multiple = false,
  className,
}: TreeSelectProps) {
  const [open, setOpen] = useState(false)
  const hasValue = value.length > 0
  const label = value.length ? getTreeSelectLabels(options, value) : null
  const showClear = allowClear && hasValue && !disabled && !required

  function handleClear() {
    onChange?.([])
    setOpen(false)
  }

  function toggle(val: string) {
    if (multiple) {
      const next = value.includes(val) ? value.filter((v) => v !== val) : [...value, val]
      onChange?.(next)
      return
    }

    onChange?.([val])
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
      <FieldPopoverContent className={treeSelectContentClassName} align="start">
        <ul className={treeSelectListClassName}>
          {options.map((option) => (
            <TreeNode
              key={option.value}
              option={option}
              selected={value}
              onToggle={toggle}
              multiple={multiple}
            />
          ))}
        </ul>
      </FieldPopoverContent>
    </FieldPopover>
  )
}
