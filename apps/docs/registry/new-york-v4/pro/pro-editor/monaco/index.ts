import type { Monaco } from '@monaco-editor/react'
import type { EditorTheme } from '../types'
import { githubDarkTheme, githubLightTheme } from './github-themes'

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
const GITHUB_MONACO_THEMES: Record<EditorTheme, MonacoThemeData> = {
  'github-light': githubLightTheme as MonacoThemeData,
  'github-dark': githubDarkTheme as MonacoThemeData,
}

export function applyShadcnTheme(monaco: Monaco, theme: EditorTheme) {
  monaco.editor.defineTheme(theme, GITHUB_MONACO_THEMES[theme])
  monaco.editor.setTheme(theme)
}
