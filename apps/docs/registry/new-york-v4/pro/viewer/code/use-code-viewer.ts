'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ThemedToken } from 'shiki'
import { codeToTokenLines, type ViewerTheme } from '../shared/syntax'
import { buildCodeLines, getHiddenCodeLines } from './lines'

export interface UseCodeViewerOptions {
  code: string
  lang: string
  theme: ViewerTheme
}

export function useCodeViewer({ code, lang, theme }: UseCodeViewerOptions) {
  const [tokenLines, setTokenLines] = useState<ThemedToken[][]>([])
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
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
  const toggleFold = useCallback((lineIndex: number) => {
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(lineIndex)) next.delete(lineIndex)
      else next.add(lineIndex)
      return next
    })
  }, [])

  return {
    loading,
    failed,
    lines,
    collapsed,
    hiddenLines,
    toggleFold,
  }
}
