import { codeToTokensBase, type ThemedToken } from 'shiki'

export type ViewerTheme = 'light' | 'dark'

export const DEFAULT_VIEWER_THEME: ViewerTheme = 'dark'

export const scrollbarClassName =
  '[scrollbar-width:thin] [scrollbar-color:transparent_transparent] hover:[scrollbar-color:var(--muted-foreground)_transparent] [&::-webkit-scrollbar]:size-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/35'

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
  return codeToTokensBase(code || ' ', {
    lang: lang as never,
    theme: (theme === 'dark' ? 'one-dark-pro' : 'one-light') as never,
  })
}

export function viewerSurfaceClass(theme: ViewerTheme, _embedded?: boolean) {
  return theme === 'light' ? 'bg-muted/40 text-foreground' : 'bg-muted text-foreground'
}
