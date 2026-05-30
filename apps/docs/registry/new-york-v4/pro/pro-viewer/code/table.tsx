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
  const isLight = themeMode === 'light'

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
              className={cn(
                'group/line leading-6',
                isLight ? 'hover:bg-black/[0.03]' : 'hover:bg-white/[0.03]',
              )}
            >
              {showLineNumbers && (
                <td
                  className={cn(
                    'w-10 select-none border-r py-0 pl-2 pr-3 text-right font-mono text-xs',
                    isLight ? 'border-black/10 text-[#57606a]' : 'border-white/5 text-white/20',
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
                      'flex h-full w-4 items-center justify-center',
                      isLight
                        ? 'text-[#57606a] hover:text-[#24292f]'
                        : 'text-white/25 hover:text-white/70',
                    )}
                    aria-label={isFolded ? 'Expand' : 'Collapse'}
                  >
                    <ChevronRight
                      className={cn('h-3 w-3 transition-transform', !isFolded && 'rotate-90')}
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
                      'ml-1 rounded border px-1.5 py-0 text-xs',
                      isLight
                        ? 'border-black/10 text-[#57606a] hover:bg-black/5 hover:text-[#24292f]'
                        : 'border-white/10 text-white/35 hover:bg-white/10 hover:text-white/70',
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
