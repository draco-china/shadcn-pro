'use client'

import { cn } from '@/lib/utils'
import { tokensToHtml } from '../shared/syntax'
import {
  codeViewerCodeCellClassName,
  codeViewerFoldCellClassName,
  codeViewerLineNumberCellClassName,
  codeViewerTableRowClassName,
} from './classes'
import { CodeFoldButton, FoldedLinesButton } from './fold-button'
import type { CodeLine } from './lines'

export function CodeViewerTableRow({
  line,
  folded,
  showLineNumbers,
  rowHoverClass,
  onToggleFold,
}: {
  line: CodeLine
  folded: boolean
  showLineNumbers: boolean
  rowHoverClass: string
  onToggleFold: (lineIndex: number) => void
}) {
  const hiddenCount = folded ? line.foldEnd - line.index : 0

  return (
    <tr className={cn(codeViewerTableRowClassName, rowHoverClass)}>
      {showLineNumbers && <td className={codeViewerLineNumberCellClassName}>{line.index + 1}</td>}
      <td className={codeViewerFoldCellClassName}>
        {line.isFoldable ? (
          <CodeFoldButton folded={folded} lineIndex={line.index} onToggle={onToggleFold} />
        ) : null}
      </td>
      <td className={codeViewerCodeCellClassName}>
        <span
          // biome-ignore lint/security/noDangerouslySetInnerHtml: escaped token content from shiki
          dangerouslySetInnerHTML={{ __html: tokensToHtml(line.tokens) }}
        />
        {folded && (
          <FoldedLinesButton count={hiddenCount} lineIndex={line.index} onToggle={onToggleFold} />
        )}
      </td>
    </tr>
  )
}
