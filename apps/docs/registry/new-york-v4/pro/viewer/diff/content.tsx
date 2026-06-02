'use client'

import { diffViewerScrollClassName, diffViewerSplitClassName } from './classes'
import { SplitDiffPane } from './split-pane'
import { UnifiedDiffTable } from './table'
import type { DiffLine, DiffView } from './utils'

export function DiffViewerContent({
  view,
  unified,
  left,
  right,
  oldTitle,
  newTitle,
  htmlMap,
}: {
  view: DiffView
  unified: DiffLine[]
  left: (DiffLine | null)[]
  right: (DiffLine | null)[]
  oldTitle: string
  newTitle: string
  htmlMap: Map<string, string>
}) {
  if (view === 'unified') {
    return (
      <div className={diffViewerScrollClassName}>
        <UnifiedDiffTable lines={unified} htmlMap={htmlMap} />
      </div>
    )
  }

  return (
    <div className={diffViewerSplitClassName}>
      <SplitDiffPane title={oldTitle} lines={left} side="old" htmlMap={htmlMap} />
      <SplitDiffPane title={newTitle} lines={right} side="new" htmlMap={htmlMap} />
    </div>
  )
}
