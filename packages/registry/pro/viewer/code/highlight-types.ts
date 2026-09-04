export interface HighlightToken {
  content: string
  offset: number
  color?: string
  fontStyle?: number
}

export interface HighlightWorkerRequest {
  id: number
  code: string
  lang: string
  theme: 'light' | 'dark'
  cdnBaseUrl: string
}

export type HighlightWorkerResponse =
  | { id: number; lines: HighlightToken[][] }
  | { id: number; error: string }
