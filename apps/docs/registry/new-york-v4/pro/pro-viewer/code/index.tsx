'use client'

import { type Ref, type UIEventHandler, useCallback, useEffect, useMemo, useState } from 'react'
import type { ThemedToken } from 'shiki'
import { cn } from '@/lib/utils'
import { buildCodeLines, getHiddenCodeLines } from './lines'
import { CodeViewerHeader } from './header'
import { CodeViewerTable } from './table'
import {
  codeToTokenLines,
  DEFAULT_VIEWER_THEME,
  scrollbarClassName,
  type ViewerTheme,
  viewerSurfaceClass,
} from './syntax'

export interface CodeViewerProps {
  code: string
  lang?: string
  theme?: ViewerTheme
  showLineNumbers?: boolean
  showHeader?: boolean
  surface?: 'code' | 'embedded'
  className?: string
  title?: string
  emptyText?: string
  scrollRef?: Ref<HTMLDivElement>
  onScroll?: UIEventHandler<HTMLDivElement>
}

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
  const [tokenLines, setTokenLines] = useState<ThemedToken[][]>([])
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const [copied, setCopied] = useState(false)
  const [collapsed, setCollapsed] = useState<Set<number>>(new Set())

  const rawLines = useMemo(() => (code ? code.split('\n') : []), [code])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setFailed(false)
    setCollapsed(new Set())

    if (!code) {
      setTokenLines([])
      setLoading(false)
      return
    }

    codeToTokenLines(code, lang, theme)
      .then((result) => {
        if (!cancelled) setTokenLines(result)
      })
      .catch(() => {
        if (!cancelled) {
          setTokenLines([])
          setFailed(true)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [code, lang, theme])

  const lines = useMemo(() => buildCodeLines(rawLines, tokenLines), [rawLines, tokenLines])
  const hiddenLines = useMemo(() => getHiddenCodeLines(collapsed, lines), [collapsed, lines])
  const embedded = surface === 'embedded'

  const toggleFold = useCallback((lineIndex: number) => {
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(lineIndex)) next.delete(lineIndex)
      else next.add(lineIndex)
      return next
    })
  }, [])

  const copy = useCallback(async () => {
    if (!code) return
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }, [code])

  return (
    <div
      className={cn(
        'group/code-viewer flex min-h-0 flex-col overflow-hidden rounded-lg border',
        viewerSurfaceClass(theme, embedded),
        className,
      )}
    >
      {showHeader && (
        <CodeViewerHeader
          title={title ?? lang}
          copied={copied}
          embedded={embedded}
          theme={theme}
          onCopy={copy}
        />
      )}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className={cn('min-h-0 flex-1 overflow-auto', scrollbarClassName, !showHeader && 'py-2')}
      >
        {loading || failed || lines.length === 0 ? (
          <div className="px-4 py-6 font-mono text-sm opacity-60">
            {loading ? 'Loading...' : failed ? 'Unable to highlight code' : emptyText}
          </div>
        ) : (
          <CodeViewerTable
            lines={lines}
            collapsed={collapsed}
            hiddenLines={hiddenLines}
            showLineNumbers={showLineNumbers}
            embedded={embedded}
            theme={theme}
            onToggleFold={toggleFold}
          />
        )}
      </div>
    </div>
  )
}
