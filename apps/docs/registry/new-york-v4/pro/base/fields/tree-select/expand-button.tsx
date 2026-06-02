'use client'

import { ChevronDown, ChevronRight } from 'lucide-react'
import { ProButton } from '@/components/pro/base/button'
import { treeSelectExpandButtonClassName, treeSelectExpandPlaceholderClassName } from './classes'

export function TreeNodeExpandButton({
  expanded,
  hasChildren,
  onClick,
}: {
  expanded: boolean
  hasChildren: boolean
  onClick: () => void
}) {
  if (!hasChildren) {
    return <span className={treeSelectExpandPlaceholderClassName} aria-hidden />
  }

  return (
    <ProButton
      type="button"
      variant="ghost"
      size="icon-xs"
      aria-label={expanded ? 'Collapse' : 'Expand'}
      className={treeSelectExpandButtonClassName}
      onClick={onClick}
    >
      {expanded ? <ChevronDown /> : <ChevronRight />}
    </ProButton>
  )
}
