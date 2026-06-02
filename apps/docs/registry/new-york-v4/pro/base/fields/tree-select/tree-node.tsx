'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  treeSelectNestedListClassName,
  treeSelectNodeClassName,
  treeSelectNodeDisabledClassName,
} from './classes'
import { TreeNodeExpandButton } from './expand-button'
import { TreeNodeOptionButton } from './option-button'
import type { TreeSelectOption } from './types'

interface TreeNodeProps {
  option: TreeSelectOption
  selected: string[]
  onToggle: (value: string) => void
  multiple?: boolean
}

export function TreeNode({ option, selected, onToggle, multiple }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(false)
  const childOptions = option.children ?? []
  const hasChildren = childOptions.length > 0
  const isSelected = selected.includes(option.value)

  return (
    <li>
      <div
        className={cn(treeSelectNodeClassName, option.disabled && treeSelectNodeDisabledClassName)}
      >
        <TreeNodeExpandButton
          expanded={expanded}
          hasChildren={hasChildren}
          onClick={() => hasChildren && setExpanded(!expanded)}
        />
        <TreeNodeOptionButton
          option={option}
          selected={isSelected}
          multiple={multiple}
          onToggle={onToggle}
        />
      </div>
      {expanded && hasChildren && (
        <ul className={treeSelectNestedListClassName}>
          {childOptions.map((child) => (
            <TreeNode
              key={child.value}
              option={child}
              selected={selected}
              onToggle={onToggle}
              multiple={multiple}
            />
          ))}
        </ul>
      )}
    </li>
  )
}
