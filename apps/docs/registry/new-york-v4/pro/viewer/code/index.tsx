'use client'

import { cn } from '@/lib/utils'
import { DEFAULT_VIEWER_THEME, scrollbarClassName, viewerSurfaceClass } from '../shared/syntax'
import { codeViewerRootClassName, codeViewerScrollClassName } from './classes'
import { CodeViewerHeader } from './header'
import { CodeViewerStatus } from './status'
import { CodeViewerTable } from './table'
import type { CodeViewerProps } from './types'
import { useCodeViewer } from './use-code-viewer'

export type { CodeViewerProps } from './types'

export function CodeViewer({
  code,
  lang = 'typescript',
  theme = DEFAULT_VIEWER_THEME,
  showLineNumbers = true,
  showHeader = true,
  surface = 'code',
  className,
  title,
  emptyText = 'No code',
  scrollRef,
  onScroll,
}: CodeViewerProps) {
  const viewer = useCodeViewer({ code, lang, theme })
  const embedded = surface === 'embedded'

  return (
    <div className={cn(codeViewerRootClassName, viewerSurfaceClass(theme), className)}>
      {showHeader && (
        <CodeViewerHeader title={title ?? lang} code={code} embedded={embedded} theme={theme} />
      )}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className={cn(codeViewerScrollClassName, scrollbarClassName, !showHeader && 'py-2')}
      >
        {viewer.loading || viewer.failed || viewer.lines.length === 0 ? (
          <CodeViewerStatus loading={viewer.loading} failed={viewer.failed} emptyText={emptyText} />
        ) : (
          <CodeViewerTable
            lines={viewer.lines}
            collapsed={viewer.collapsed}
            hiddenLines={viewer.hiddenLines}
            showLineNumbers={showLineNumbers}
            theme={theme}
            onToggleFold={viewer.toggleFold}
          />
        )}
      </div>
    </div>
  )
}
