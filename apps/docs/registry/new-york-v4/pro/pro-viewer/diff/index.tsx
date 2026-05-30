'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  codeToTokenLines,
  DEFAULT_VIEWER_THEME,
  tokensToHtml,
  type ViewerTheme,
} from '../code/syntax'
import { SplitDiffPane, UnifiedDiffTable } from './table'
import { computeSplitDiff, countDiffLines, type DiffView } from './utils'

export interface DiffViewerProps {
  oldCode: string
  newCode: string
  oldTitle?: string
  newTitle?: string
  lang?: string
  theme?: ViewerTheme
  defaultView?: DiffView
  className?: string
}

export function DiffViewer({
  oldCode,
  newCode,
  oldTitle = 'Before',
  newTitle = 'After',
  lang = 'typescript',
  theme = DEFAULT_VIEWER_THEME,
  defaultView = 'split',
  className,
}: DiffViewerProps) {
  const [view, setView] = useState<DiffView>(defaultView)
  const [htmlMap, setHtmlMap] = useState<Map<string, string>>(new Map())
  const { unified, left, right } = useMemo(
    () => computeSplitDiff(oldCode, newCode),
    [oldCode, newCode],
  )
  const { added, removed } = useMemo(() => countDiffLines(unified), [unified])

  useEffect(() => {
    let cancelled = false
    const uniqueLines = [...new Set(unified.map((line) => line.content))]

    Promise.all(
      uniqueLines.map(async (line) => {
        const tokens = await codeToTokenLines(line || ' ', lang, theme)
        return [line, tokensToHtml(tokens.flat())] as [string, string]
      }),
    )
      .then((entries) => {
        if (!cancelled) setHtmlMap(new Map(entries))
      })
      .catch(() => {
        if (!cancelled) setHtmlMap(new Map())
      })

    return () => {
      cancelled = true
    }
  }, [unified, lang, theme])

  return (
    <div className={cn('overflow-hidden rounded-lg border bg-muted text-foreground', className)}>
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-primary">+{added}</span>
          <span className="font-mono text-xs text-destructive">-{removed}</span>
        </div>
        <div className="flex gap-1 rounded-md border border-border p-0.5">
          {(['split', 'unified'] as const).map((nextView) => (
            <Button
              key={nextView}
              variant={view === nextView ? 'secondary' : 'ghost'}
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={() => setView(nextView)}
            >
              {nextView === 'split' ? 'Split' : 'Unified'}
            </Button>
          ))}
        </div>
      </div>

      {view === 'unified' ? (
        <div className="overflow-auto">
          <UnifiedDiffTable lines={unified} htmlMap={htmlMap} />
        </div>
      ) : (
        <div className="grid grid-cols-2 divide-x divide-border overflow-auto">
          <SplitDiffPane title={oldTitle} lines={left} side="old" htmlMap={htmlMap} />
          <SplitDiffPane title={newTitle} lines={right} side="new" htmlMap={htmlMap} />
        </div>
      )}
    </div>
  )
}
