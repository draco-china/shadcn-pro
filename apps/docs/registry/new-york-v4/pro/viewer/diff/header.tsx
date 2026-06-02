'use client'

import { ProButton } from '@/components/pro/base/button'
import {
  diffViewerAddedCountClassName,
  diffViewerHeaderClassName,
  diffViewerModeButtonClassName,
  diffViewerModeGroupClassName,
  diffViewerRemovedCountClassName,
  diffViewerStatsClassName,
} from './classes'
import { DIFF_VIEWS, type DiffView } from './utils'

export function DiffViewerHeader({
  added,
  removed,
  view,
  onViewChange,
}: {
  added: number
  removed: number
  view: DiffView
  onViewChange: (view: DiffView) => void
}) {
  return (
    <div className={diffViewerHeaderClassName}>
      <div className={diffViewerStatsClassName}>
        <span className={diffViewerAddedCountClassName}>+{added}</span>
        <span className={diffViewerRemovedCountClassName}>-{removed}</span>
      </div>
      <div className={diffViewerModeGroupClassName}>
        {DIFF_VIEWS.map((nextView) => (
          <ProButton
            key={nextView}
            variant={view === nextView ? 'secondary' : 'ghost'}
            size="sm"
            className={diffViewerModeButtonClassName}
            onClick={() => onViewChange(nextView)}
          >
            {nextView === 'split' ? 'Split' : 'Unified'}
          </ProButton>
        ))}
      </div>
    </div>
  )
}
