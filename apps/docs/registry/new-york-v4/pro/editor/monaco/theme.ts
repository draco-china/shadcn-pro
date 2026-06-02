import type { Monaco } from '@monaco-editor/react'
import type { EditorTheme } from '../types'
import { getMonacoTextmateTheme, getShikiThemeId } from './shiki'

export function fallbackMonacoTheme(theme: EditorTheme): 'vs' | 'vs-dark' {
  return theme === 'dark' ? 'vs-dark' : 'vs'
}

export async function applyShadcnTheme(monaco: Monaco, theme: EditorTheme) {
  const name = getShikiThemeId(theme)
  const base = await getMonacoTextmateTheme(monaco, theme)

  monaco.editor.defineTheme(name, {
    ...base,
    colors: { ...base.colors, ...getShadcnEditorColors(base.colors) },
  })
  monaco.editor.setTheme(name)
}

function getShadcnEditorColors(baseColors: Record<string, string> | undefined) {
  const bg = cssVar('--background') || baseColors?.['editor.background'] || '#ffffff'
  const fg = cssVar('--foreground') || baseColors?.['editor.foreground'] || '#000000'
  const muted = cssVar('--muted') || '#f4f4f5'
  const mutedFg = cssVar('--muted-foreground') || '#71717a'
  const border = cssVar('--border') || '#e4e4e7'
  const accent = cssVar('--accent') || '#f4f4f5'
  const primary = cssVar('--primary') || '#18181b'

  return {
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
}

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
