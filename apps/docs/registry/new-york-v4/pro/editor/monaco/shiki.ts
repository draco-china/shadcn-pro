import type { Monaco } from '@monaco-editor/react'
import { shikiToMonaco, textmateThemeToMonacoTheme } from '@shikijs/monaco'
import { createHighlighter, type Highlighter } from 'shiki'
import type { EditorTheme } from '../types'

export type MonacoThemeData = Parameters<Monaco['editor']['defineTheme']>[1]

const SHIKI_THEMES = ['one-dark-pro', 'one-light'] as const

const SHIKI_LANGS = [
  'tsx',
  'jsx',
  'css',
  'go',
  'html',
  'java',
  'json',
  'markdown',
  'python',
  'rust',
  'shell',
  'sql',
  'yaml',
] as const

const LANG_ALIAS: Record<string, string> = {
  typescript: 'tsx',
  javascript: 'jsx',
}

let highlighterPromise: Promise<Highlighter> | null = null
let wiredMonaco: Monaco | null = null

export function getShikiThemeId(theme: EditorTheme): (typeof SHIKI_THEMES)[number] {
  return theme === 'dark' ? 'one-dark-pro' : 'one-light'
}

export async function getMonacoTextmateTheme(
  monaco: Monaco,
  theme: EditorTheme,
): Promise<MonacoThemeData> {
  const highlighter = await ensureShiki(monaco)
  return textmateThemeToMonacoTheme(highlighter.getTheme(getShikiThemeId(theme)))
}

function getHighlighter(): Promise<Highlighter> {
  const existing = highlighterPromise
  if (existing) return existing
  const created = createHighlighter({
    themes: [...SHIKI_THEMES],
    langs: [...SHIKI_LANGS],
    langAlias: LANG_ALIAS,
  })
  highlighterPromise = created
  return created
}

async function ensureShiki(monaco: Monaco): Promise<Highlighter> {
  const highlighter = await getHighlighter()
  if (wiredMonaco !== monaco) {
    shikiToMonaco(highlighter, monaco)
    wiredMonaco = monaco
  }
  return highlighter
}
