'use client'

import { ChevronRight } from 'lucide-react'
import { ProButton } from '@/components/pro/base/button'
import { cn } from '@/lib/utils'
import {
  codeFoldButtonClassName,
  codeFoldedLinesButtonClassName,
  codeFoldIconClassName,
} from './classes'

export function CodeFoldButton({
  folded,
  lineIndex,
  onToggle,
}: {
  folded: boolean
  lineIndex: number
  onToggle: (lineIndex: number) => void
}) {
  return (
    <ProButton
      type="button"
      variant="ghost"
      size="icon-xs"
      onClick={() => onToggle(lineIndex)}
      className={codeFoldButtonClassName}
      aria-label={folded ? 'Expand' : 'Collapse'}
    >
      <ChevronRight className={cn(codeFoldIconClassName, !folded && 'rotate-90')} />
    </ProButton>
  )
}

export function FoldedLinesButton({
  count,
  lineIndex,
  onToggle,
}: {
  count: number
  lineIndex: number
  onToggle: (lineIndex: number) => void
}) {
  return (
    <ProButton
      type="button"
      variant="outline"
      size="xs"
      onClick={() => onToggle(lineIndex)}
      className={codeFoldedLinesButtonClassName}
    >
      {count} lines
    </ProButton>
  )
}
