'use client'

import { useEffect, useState } from 'react'
import { codeToTokenLines, tokensToHtml, type ViewerTheme } from '../shared/syntax'
import type { DiffLine } from './utils'

export function useDiffHighlight({
  lines,
  lang,
  theme,
}: {
  lines: DiffLine[]
  lang: string
  theme: ViewerTheme
}) {
  const [htmlMap, setHtmlMap] = useState<Map<string, string>>(new Map())

  useEffect(() => {
    let cancelled = false
    const uniqueLines = [...new Set(lines.map((line) => line.content))]

    Promise.all(
      uniqueLines.map(async (line) => {
        const tokens = await codeToTokenLines(line || ' ', lang, theme)
        return [line, tokensToHtml(tokens.flat())] as const
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
  }, [lines, lang, theme])

  return htmlMap
}
