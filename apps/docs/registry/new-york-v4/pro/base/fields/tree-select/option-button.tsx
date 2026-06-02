'use client'

import { Check } from 'lucide-react'
import { ProButton } from '@/components/pro/base/button'
import { cn } from '@/lib/utils'
import { CheckboxControl } from '../checkbox/control'
import {
  treeSelectCheckIconClassName,
  treeSelectMultipleOptionClassName,
  treeSelectOptionSelectedClassName,
  treeSelectSingleOptionClassName,
} from './classes'
import type { TreeSelectOption } from './types'

export function TreeNodeOptionButton({
  option,
  selected,
  multiple,
  onToggle,
}: {
  option: TreeSelectOption
  selected: boolean
  multiple?: boolean
  onToggle: (value: string) => void
}) {
  function handleToggle() {
    if (!option.disabled) onToggle(option.value)
  }

  if (multiple) {
    return (
      <>
        <CheckboxControl
          checked={selected}
          disabled={option.disabled}
          onCheckedChange={handleToggle}
          aria-label={option.label}
        />
        <ProButton
          type="button"
          variant="ghost"
          size="xs"
          disabled={option.disabled}
          onClick={handleToggle}
          className={cn(
            treeSelectMultipleOptionClassName,
            selected && treeSelectOptionSelectedClassName,
          )}
        >
          {option.label}
        </ProButton>
      </>
    )
  }

  return (
    <ProButton
      type="button"
      variant="ghost"
      size="xs"
      disabled={option.disabled}
      onClick={handleToggle}
      className={cn(treeSelectSingleOptionClassName, selected && treeSelectOptionSelectedClassName)}
    >
      <span>{option.label}</span>
      {selected && <Check className={treeSelectCheckIconClassName} />}
    </ProButton>
  )
}
