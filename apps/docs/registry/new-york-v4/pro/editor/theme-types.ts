/** Default ESM CDN used by the Shiki syntax/theme Worker. */
export const DEFAULT_SHIKI_CDN = 'https://esm.sh'

export interface MonacoThemeData {
  base: 'vs' | 'vs-dark' | 'hc-black' | 'hc-light'
  inherit: boolean
  rules: Array<Record<string, unknown>>
  colors: Record<string, string>
  encodedTokensColors?: string[]
  semanticColors: string[]
}

export interface ThemeWorkerRequest {
  kind: 'theme'
  id: number
  theme: 'light' | 'dark'
  cdnBaseUrl: string
}

export interface SyntaxWorkerRequest {
  kind: 'tokens'
  id: number
  code: string
  language: string
  theme: 'light' | 'dark'
  cdnBaseUrl: string
}

export type EditorWorkerRequest = ThemeWorkerRequest | SyntaxWorkerRequest

export type EditorWorkerResponse =
  | { kind: 'theme'; id: number; theme: MonacoThemeData }
  | { kind: 'tokens'; id: number; data: number[] }
  | { kind: 'error'; requestKind: EditorWorkerRequest['kind']; id: number; error: string }
