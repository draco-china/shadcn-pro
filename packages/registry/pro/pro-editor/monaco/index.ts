// Shiki-powered syntax highlighting for Monaco (VS Code-grade TextMate grammars).
// Themes: One Dark Pro / One Light, selected by `themeMode`.
// Editor chrome (background, gutters, scrollbars, widgets) is injected at runtime
// from shadcn CSS variables so the editor blends with the surrounding theme.

import type { Monaco } from '@monaco-editor/react'
import { shikiToMonaco, textmateThemeToMonacoTheme } from '@shikijs/monaco'
import { createHighlighter, type Highlighter } from 'shiki'
import type { EditorThemeMode } from '../types'

/** Shiki theme ids loaded into Monaco. */
const SHIKI_THEMES = ['one-dark-pro', 'one-light'] as const

/**
 * Shiki grammars to load. `tsx`/`jsx` are aliased onto Monaco's built-in
 * `typescript`/`javascript` language ids (see LANG_ALIAS) so JSX is highlighted
 * correctly while Monaco's TypeScript language service (IntelliSense) keeps working.
 */
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

/** Map Monaco language ids to the Shiki grammar that should tokenize them. */
const LANG_ALIAS: Record<string, string> = {
  typescript: 'tsx',
  javascript: 'jsx',
}

function themeId(themeMode: EditorThemeMode): (typeof SHIKI_THEMES)[number] {
  return themeMode === 'dark' ? 'one-dark-pro' : 'one-light'
}

/** Built-in Monaco theme used as a placeholder until the Shiki theme is ready. */
export function fallbackMonacoTheme(themeMode: EditorThemeMode): 'vs' | 'vs-dark' {
  return themeMode === 'dark' ? 'vs-dark' : 'vs'
}

let highlighterPromise: Promise<Highlighter> | null = null

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

let wiredMonaco: Monaco | null = null

/** Create the highlighter (once) and wire Shiki tokenizers/themes into Monaco. */
async function ensureShiki(monaco: Monaco): Promise<Highlighter> {
  const highlighter = await getHighlighter()
  if (wiredMonaco !== monaco) {
    shikiToMonaco(highlighter, monaco)
    wiredMonaco = monaco
  }
  return highlighter
}

const TSX_REACT_TYPES = `
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}

declare module "react" {
  export type ReactNode = any
  export type ComponentType<P = any> = (props: P) => ReactNode
  export function useState<S>(initialState: S | (() => S)): [S, (value: S | ((prev: S) => S)) => void]
  export function useEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void
  export function useMemo<T>(factory: () => T, deps?: readonly unknown[]): T
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps?: readonly unknown[]): T
  const React: {
    createElement: (...args: any[]) => any
  }
  export default React
}

declare module "react/jsx-runtime" {
  export const jsx: (...args: any[]) => any
  export const jsxs: (...args: any[]) => any
  export const Fragment: any
}
`

let hasRegisteredTsxTypes = false

export function configureTypescript(monaco: Monaco) {
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
    allowNonTsExtensions: true,
    target: monaco.languages.typescript.ScriptTarget.Latest,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  })
  if (!hasRegisteredTsxTypes) {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      TSX_REACT_TYPES,
      'file:///node_modules/@types/react/index.d.ts',
    )
    hasRegisteredTsxTypes = true
  }
}

/** Read a shadcn CSS variable and resolve it to a #rrggbb hex string via canvas. */
function cssVar(name: string): string {
  if (typeof document === 'undefined') return ''
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  if (!raw) return ''
  try {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 1
    const ctx = canvas.getContext('2d')
    if (!ctx) return ''
    ctx.fillStyle = raw
    ctx.fillRect(0, 0, 1, 1)
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
    return `#${[r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('')}`
  } catch {
    return ''
  }
}

/**
 * Define and apply the active editor theme. Token colors come from the One Dark
 * Pro / One Light Shiki theme; editor chrome is overridden with shadcn CSS
 * variables so the editor matches the surrounding UI. Async: waits for the highlighter.
 */
export async function applyShadcnTheme(monaco: Monaco, themeMode: EditorThemeMode) {
  const highlighter = await ensureShiki(monaco)
  const name = themeId(themeMode)
  const base = textmateThemeToMonacoTheme(highlighter.getTheme(name))
  const baseColors = (base as { colors?: Record<string, string> }).colors

  const bg = cssVar('--background') || baseColors?.['editor.background'] || '#ffffff'
  const fg = cssVar('--foreground') || baseColors?.['editor.foreground'] || '#000000'
  const muted = cssVar('--muted') || '#f4f4f5'
  const mutedFg = cssVar('--muted-foreground') || '#71717a'
  const border = cssVar('--border') || '#e4e4e7'
  const accent = cssVar('--accent') || '#f4f4f5'
  const primary = cssVar('--primary') || '#18181b'

  const overrides: Record<string, string> = {
    'editor.background': bg,
    'editor.foreground': fg,
    'editorLineNumber.foreground': mutedFg,
    'editorLineNumber.activeForeground': fg,
    'editor.lineHighlightBackground': muted,
    'editor.selectionBackground': `${primary}33`,
    'editor.inactiveSelectionBackground': `${primary}1a`,
    'editorCursor.foreground': fg,
    'editorWhitespace.foreground': border,
    'editorIndentGuide.background1': border,
    'editorIndentGuide.activeBackground1': mutedFg,
    'editor.selectionHighlightBorder': border,
    'editorWidget.background': bg,
    'editorWidget.border': border,
    'editorSuggestWidget.background': bg,
    'editorSuggestWidget.border': border,
    'editorSuggestWidget.foreground': fg,
    'editorSuggestWidget.selectedBackground': accent,
    'editorSuggestWidget.selectedForeground': fg,
    'editorHoverWidget.background': bg,
    'editorHoverWidget.border': border,
    'editorGutter.background': bg,
    'scrollbar.shadow': '#00000000',
    'scrollbarSlider.background': `${mutedFg}40`,
    'scrollbarSlider.hoverBackground': `${mutedFg}66`,
    'scrollbarSlider.activeBackground': `${mutedFg}99`,
    'minimap.background': bg,
  }

  monaco.editor.defineTheme(name, {
    ...(base as Parameters<Monaco['editor']['defineTheme']>[1]),
    colors: { ...baseColors, ...overrides },
  })
  monaco.editor.setTheme(name)
}
