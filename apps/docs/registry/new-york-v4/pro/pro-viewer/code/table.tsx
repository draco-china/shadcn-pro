'use client'

import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CodeLine } from './lines'
import { tokensToHtml, type ViewerTheme } from './syntax'

export interface CodeViewerTableProps {
  lines: CodeLine[]
  collapsed: Set<number>
  hiddenLines: Set<number>
  showLineNumbers: boolean
  embedded: boolean
  theme: ViewerTheme
  onToggleFold: (lineIndex: number) => void
}

export function CodeViewerTable({
  lines,
  collapsed,
  hiddenLines,
  showLineNumbers,
  embedded: _embedded,
  theme,
  onToggleFold,
}: CodeViewerTableProps) {
  const isLight = theme === 'light'
  const rowHoverClass = isLight ? 'hover:bg-accent/60' : 'hover:bg-accent/40'

  return (
    <table className="w-full min-w-full border-collapse">
      <tbody>
        {lines.map((line) => {
          if (hiddenLines.has(line.index)) return null
          const isFolded = collapsed.has(line.index)
          const hiddenCount = isFolded ? line.foldEnd - line.index : 0

          return (
            <tr
              key={line.index}
              className={cn('group/line leading-6', rowHoverClass)}
            >
              {showLineNumbers && (
                <td
                  className={cn(
                    'w-10 select-none border-r border-border py-0 pl-2 pr-3 text-right font-mono text-xs text-muted-foreground',
                  )}
                >
                  {line.index + 1}
                </td>
              )}
              <td className="w-4 select-none py-0">
                {line.isFoldable ? (
                  <button
                    type="button"
                    onClick={() => onToggleFold(line.index)}
                    className={cn(
                      'flex h-full w-4 items-center justify-center text-muted-foreground hover:text-foreground',
                    )}
                    aria-label={isFolded ? 'Expand' : 'Collapse'}
                  >
                    <ChevronRight
                      className={cn('size-3 transition-transform', !isFolded && 'rotate-90')}
                    />
                  </button>
                ) : null}
              </td>
              <td className="py-0 pl-2 pr-6 font-mono text-sm whitespace-pre">
                <span
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: escaped token content from shiki
                  dangerouslySetInnerHTML={{ __html: tokensToHtml(line.tokens) }}
                />
                {isFolded && (
                  <button
                    type="button"
                    onClick={() => onToggleFold(line.index)}
                    className={cn(
                      'ml-1 rounded border border-border px-1.5 py-0 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                    )}
                  >
                    {hiddenCount} lines
                  </button>
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
