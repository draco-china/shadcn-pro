'use client'

import type { ViewerTheme } from '../shared/syntax'
import { codeViewerTableClassName } from './classes'
import type { CodeLine } from './lines'
import { CodeViewerTableRow } from './table-row'

export interface CodeViewerTableProps {
  lines: CodeLine[]
  collapsed: Set<number>
  hiddenLines: Set<number>
  showLineNumbers: boolean
  theme: ViewerTheme
  onToggleFold: (lineIndex: number) => void
}

export function CodeViewerTable({
  lines,
  collapsed,
  hiddenLines,
  showLineNumbers,
  theme,
  onToggleFold,
}: CodeViewerTableProps) {
  const isLight = theme === 'light'
  const rowHoverClass = isLight ? 'hover:bg-accent/60' : 'hover:bg-accent/40'

  return (
    <table className={codeViewerTableClassName}>
      <tbody>
        {lines.map((line) => {
          if (hiddenLines.has(line.index)) return null
          const isFolded = collapsed.has(line.index)

          return (
            <CodeViewerTableRow
              key={line.index}
              line={line}
              folded={isFolded}
              showLineNumbers={showLineNumbers}
              rowHoverClass={rowHoverClass}
              onToggleFold={onToggleFold}
            />
          )
        })}
      </tbody>
    </table>
  )
}
