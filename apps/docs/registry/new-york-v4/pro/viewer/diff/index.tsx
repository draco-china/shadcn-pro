'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { DEFAULT_VIEWER_THEME, type ViewerTheme } from '../shared/syntax'
import { diffViewerRootClassName } from './classes'
import { DiffViewerContent } from './content'
import { DiffViewerHeader } from './header'
import { useDiffHighlight } from './use-diff-highlight'
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
  const { unified, left, right } = useMemo(
    () => computeSplitDiff(oldCode, newCode),
    [oldCode, newCode],
  )
  const { added, removed } = useMemo(() => countDiffLines(unified), [unified])
  const htmlMap = useDiffHighlight({ lines: unified, lang, theme })

  return (
    <div className={cn(diffViewerRootClassName, className)}>
      <DiffViewerHeader added={added} removed={removed} view={view} onViewChange={setView} />
      <DiffViewerContent
        view={view}
        unified={unified}
        left={left}
        right={right}
        oldTitle={oldTitle}
        newTitle={newTitle}
        htmlMap={htmlMap}
      />
    </div>
  )
}
