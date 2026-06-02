'use client'

import { cn } from '@/lib/utils'
import { diffPaneTitleClassName, diffRowClassName, diffTableClassName } from './classes'
import { diffRowBackground, EmptySplitLine, HighlightedLine, LineNo } from './line-cell'
import { type DiffLine, getDiffLineKey } from './utils'

function getKeyedLines(lines: (DiffLine | null)[], side: 'old' | 'new') {
  const counts = new Map<string, number>()

  return lines.map((line) => {
    const baseKey = line ? `${side}:${getDiffLineKey(line)}` : `${side}:empty`
    const count = counts.get(baseKey) ?? 0
    counts.set(baseKey, count + 1)
    return { key: `${baseKey}:${count}`, line }
  })
}

export function SplitDiffPane({
  title,
  lines,
  side,
  htmlMap,
}: {
  title: string
  lines: (DiffLine | null)[]
  side: 'old' | 'new'
  htmlMap: Map<string, string>
}) {
  const keyedLines = getKeyedLines(lines, side)

  return (
    <div>
      <div className={diffPaneTitleClassName}>{title}</div>
      <table className={diffTableClassName}>
        <tbody>
          {keyedLines.map(({ key, line }) =>
            line ? (
              <tr key={key} className={cn(diffRowClassName, diffRowBackground[line.type])}>
                <LineNo value={side === 'old' ? line.oldLineNo : line.newLineNo} />
                <HighlightedLine content={line.content} htmlMap={htmlMap} />
              </tr>
            ) : (
              <EmptySplitLine key={key} />
            ),
          )}
        </tbody>
      </table>
    </div>
  )
}
