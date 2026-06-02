'use client'

import { cn } from '@/lib/utils'
import { diffRowClassName, diffSignCellClassName, diffTableClassName } from './classes'
import { diffRowBackground, HighlightedLine, LineNo } from './line-cell'
import { type DiffLine, getDiffLineKey } from './utils'

function getKeyedLines(lines: DiffLine[]) {
  const counts = new Map<string, number>()

  return lines.map((line) => {
    const baseKey = getDiffLineKey(line)
    const count = counts.get(baseKey) ?? 0
    counts.set(baseKey, count + 1)
    return { key: `${baseKey}:${count}`, line }
  })
}

export function UnifiedDiffTable({
  lines,
  htmlMap,
}: {
  lines: DiffLine[]
  htmlMap: Map<string, string>
}) {
  const keyedLines = getKeyedLines(lines)

  return (
    <table className={diffTableClassName}>
      <tbody>
        {keyedLines.map(({ key, line }) => (
          <tr key={key} className={cn(diffRowClassName, diffRowBackground[line.type])}>
            <LineNo value={line.oldLineNo} />
            <LineNo value={line.newLineNo} />
            <td className={diffSignCellClassName}>
              {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
            </td>
            <HighlightedLine content={line.content} htmlMap={htmlMap} />
          </tr>
        ))}
      </tbody>
    </table>
  )
}
