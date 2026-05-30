import type { Monaco } from '@monaco-editor/react'
import type { EditorTheme } from '../types'
import { githubDarkTheme, githubLightTheme } from './github-themes'
import { oneLightProFlatTheme, oneDarkProFlatTheme } from './one-dark-pro-themes'

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

type MonacoThemeData = Parameters<Monaco['editor']['defineTheme']>[1]
const GITHUB_MONACO_THEMES: Record<string, MonacoThemeData> = {
  'github-light': githubLightTheme as MonacoThemeData,
  'github-dark': githubDarkTheme as MonacoThemeData,
  'one-dark-pro-flat': oneDarkProFlatTheme as MonacoThemeData,
  'one-light-pro-flat': oneLightProFlatTheme as MonacoThemeData,
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

export function applyShadcnTheme(monaco: Monaco, theme: EditorTheme) {
  const base = GITHUB_MONACO_THEMES[theme]

  const bg = cssVar('--background') || (base.colors?.['editor.background'] as string) || '#ffffff'
  const fg = cssVar('--foreground') || (base.colors?.['editor.foreground'] as string) || '#000000'
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

  monaco.editor.defineTheme(theme, {
    ...base,
    colors: { ...base.colors, ...overrides },
  })
  monaco.editor.setTheme(theme)
}
