import { codeToTokensBase, type ThemedToken } from 'shiki'

export type ViewerTheme = 'github-light' | 'github-dark'

export const DEFAULT_VIEWER_THEME: ViewerTheme = 'github-dark'

export const scrollbarClassName =
  '[scrollbar-width:thin] [scrollbar-color:transparent_transparent] hover:[scrollbar-color:rgba(148,163,184,0.5)_transparent] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-white/25'

export function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function tokensToHtml(tokens: ThemedToken[]): string {
  if (tokens.length === 0) return '\u00a0'
  return tokens
    .map((token) => {
      const color = token.color ? ` style="color:${token.color}"` : ''
      return `<span${color}>${escapeHtml(token.content)}</span>`
    })
    .join('')
}

export async function codeToTokenLines(code: string, lang: string, theme: ViewerTheme) {
  return codeToTokensBase(code || ' ', { lang: lang as never, theme: theme as never })
}

export function viewerSurfaceClass(theme: ViewerTheme, _embedded?: boolean) {
  return theme === 'github-light' ? 'bg-[#f6f8fa] text-[#24292f]' : 'bg-[#0d1117] text-[#e6edf3]'
}
