import type { Monaco } from '@monaco-editor/react'
import type { CancellationToken, editor } from 'monaco-editor'
import {
  DEFAULT_SHIKI_CDN,
  type EditorWorkerResponse,
  type MonacoThemeData,
  type SyntaxWorkerRequest,
  type ThemeWorkerRequest,
} from './theme-types'

const SHIKI_TOKEN_TYPES = Array.from({ length: 64 }, (_, index) => `shiki${index}`)
const SHIKI_TOKEN_MODIFIERS = ['italic', 'bold', 'underline']

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

interface PendingTheme {
  resolve: (theme: MonacoThemeData) => void
  reject: (error: Error) => void
}

interface PendingTokens {
  resolve: (data: number[]) => void
  reject: (error: Error) => void
}

let themeWorker: Worker | undefined
let nextThemeRequestId = 0
let hasRegisteredTsxTypes = false
let syntaxMonaco: Monaco | undefined
let syntaxSettings = {
  cdnBaseUrl: DEFAULT_SHIKI_CDN,
  getTheme: (): 'light' | 'dark' => 'dark',
}
const pendingThemes = new Map<number, PendingTheme>()
const pendingTokens = new Map<number, PendingTokens>()

/** Configures TypeScript JSX support and Worker-backed Shiki highlighting. */
export function configureMonaco(
  monaco: Monaco,
  settings?: { cdnBaseUrl?: string; getTheme?: () => 'light' | 'dark' },
) {
  syntaxSettings = {
    cdnBaseUrl: settings?.cdnBaseUrl ?? DEFAULT_SHIKI_CDN,
    getTheme: settings?.getTheme ?? syntaxSettings.getTheme,
  }
  if (syntaxMonaco !== monaco) {
    syntaxMonaco = monaco
    monaco.languages.registerDocumentSemanticTokensProvider('*', {
      getLegend: () => ({
        tokenTypes: SHIKI_TOKEN_TYPES,
        tokenModifiers: SHIKI_TOKEN_MODIFIERS,
      }),
      provideDocumentSemanticTokens: async (
        model: editor.ITextModel,
        _lastResultId: string | null,
        cancellation: CancellationToken,
      ) => {
        try {
          const data = await requestTokens(
            model.getValue(),
            model.getLanguageId(),
            syntaxSettings.getTheme(),
            syntaxSettings.cdnBaseUrl,
          )
          return {
            data: cancellation.isCancellationRequested ? new Uint32Array() : new Uint32Array(data),
          }
        } catch {
          return { data: new Uint32Array() }
        }
      },
      releaseDocumentSemanticTokens: () => {},
    })
  }

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
    allowNonTsExtensions: true,
    target: monaco.languages.typescript.ScriptTarget.Latest,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  })
  if (hasRegisteredTsxTypes) return
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    TSX_REACT_TYPES,
    'file:///node_modules/@types/react/index.d.ts',
  )
  hasRegisteredTsxTypes = true
}

/** Applies a Shiki-derived theme generated off the main thread. */
export async function applyShadcnTheme(
  monaco: Monaco,
  theme: 'light' | 'dark',
  cdnBaseUrl = DEFAULT_SHIKI_CDN,
) {
  const name = theme === 'dark' ? 'one-dark-pro' : 'one-light'
  const base = await requestTheme(theme, cdnBaseUrl)
  const baseColors = base.colors
  const bg = cssVar('--background') || baseColors['editor.background'] || '#ffffff'
  const fg = cssVar('--foreground') || baseColors['editor.foreground'] || '#000000'
  const muted = cssVar('--muted') || '#f4f4f5'
  const mutedFg = cssVar('--muted-foreground') || '#71717a'
  const border = cssVar('--border') || '#e4e4e7'
  const accent = cssVar('--accent') || '#f4f4f5'
  const primary = cssVar('--primary') || '#18181b'

  monaco.editor.defineTheme(name, {
    ...base,
    rules: [
      ...base.rules,
      ...base.semanticColors.map((foreground, index) => ({
        token: SHIKI_TOKEN_TYPES[index],
        foreground,
      })),
    ],
    colors: {
      ...baseColors,
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
    },
  })
  monaco.editor.setTheme(name)
}

function requestTheme(theme: 'light' | 'dark', cdnBaseUrl: string) {
  return new Promise<MonacoThemeData>((resolve, reject) => {
    const id = ++nextThemeRequestId
    pendingThemes.set(id, { resolve, reject })
    const request: ThemeWorkerRequest = { kind: 'theme', id, theme, cdnBaseUrl }
    getThemeWorker().postMessage(request)
  })
}

function requestTokens(
  code: string,
  language: string,
  theme: 'light' | 'dark',
  cdnBaseUrl: string,
) {
  return new Promise<number[]>((resolve, reject) => {
    const id = ++nextThemeRequestId
    pendingTokens.set(id, { resolve, reject })
    const request: SyntaxWorkerRequest = {
      kind: 'tokens',
      id,
      code,
      language,
      theme,
      cdnBaseUrl,
    }
    getThemeWorker().postMessage(request)
  })
}

function getThemeWorker() {
  if (themeWorker) return themeWorker

  themeWorker = new Worker(new URL('./theme-worker.ts', import.meta.url), { type: 'module' })
  themeWorker.onmessage = ({ data }: MessageEvent<EditorWorkerResponse>) => {
    if (data.kind === 'theme') {
      const request = pendingThemes.get(data.id)
      pendingThemes.delete(data.id)
      request?.resolve(data.theme)
    } else if (data.kind === 'tokens') {
      const request = pendingTokens.get(data.id)
      pendingTokens.delete(data.id)
      request?.resolve(data.data)
    } else {
      const requests = data.requestKind === 'theme' ? pendingThemes : pendingTokens
      const request = requests.get(data.id)
      requests.delete(data.id)
      request?.reject(new Error(data.error))
    }
  }
  themeWorker.onerror = () => {
    const error = new Error('Editor theme worker failed')
    for (const request of pendingThemes.values()) request.reject(error)
    for (const request of pendingTokens.values()) request.reject(error)
    pendingThemes.clear()
    pendingTokens.clear()
    themeWorker?.terminate()
    themeWorker = undefined
  }
  return themeWorker
}

function cssVar(name: string) {
  if (typeof document === 'undefined') return ''
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  if (!raw) return ''
  try {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 1
    const context = canvas.getContext('2d')
    if (!context) return ''
    context.fillStyle = raw
    context.fillRect(0, 0, 1, 1)
    const [red, green, blue] = context.getImageData(0, 0, 1, 1).data
    return `#${[red, green, blue].map((channel) => channel.toString(16).padStart(2, '0')).join('')}`
  } catch {
    return ''
  }
}
