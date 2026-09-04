import type { EditorWorkerRequest, EditorWorkerResponse, MonacoThemeData } from './theme-types'

interface ShikiToken {
  content: string
  color?: string
  fontStyle?: number
}

interface ShikiHighlighter {
  getTheme(name: string): unknown
  getLoadedLanguages(): string[]
  loadLanguage(language: string): Promise<void>
  codeToTokens(code: string, options: { lang: string; theme: string }): { tokens: ShikiToken[][] }
}

interface WorkerScope {
  onmessage: ((event: MessageEvent<EditorWorkerRequest>) => void) | null
  postMessage(message: EditorWorkerResponse): void
}

const workerScope = self as unknown as WorkerScope
const highlighters = new Map<
  string,
  Promise<{
    highlighter: ShikiHighlighter
    toMonacoTheme: (theme: unknown) => MonacoThemeData
    themes: Map<string, MonacoThemeData>
  }>
>()

workerScope.onmessage = async ({ data }) => {
  try {
    const { highlighter, themes, toMonacoTheme } = await getShiki(data.cdnBaseUrl)
    const themeName = data.theme === 'dark' ? 'one-dark-pro' : 'one-light'
    const theme =
      themes.get(themeName) ?? withSemanticColors(toMonacoTheme(highlighter.getTheme(themeName)))
    themes.set(themeName, theme)

    if (data.kind === 'theme') {
      workerScope.postMessage({ kind: 'theme', id: data.id, theme })
      return
    }

    if (!highlighter.getLoadedLanguages().includes(data.language)) {
      await highlighter.loadLanguage(data.language)
    }
    const result = highlighter.codeToTokens(data.code, {
      lang: data.language,
      theme: themeName,
    })
    workerScope.postMessage({
      kind: 'tokens',
      id: data.id,
      data: toSemanticTokens(result.tokens, theme.semanticColors),
    })
  } catch (error) {
    workerScope.postMessage({
      kind: 'error',
      requestKind: data.kind,
      id: data.id,
      error: error instanceof Error ? error.message : 'Unable to load the editor theme',
    })
  }
}

function getShiki(cdnBaseUrl: string) {
  const baseUrl = cdnBaseUrl.replace(/\/+$/, '')
  const cached = highlighters.get(baseUrl)
  if (cached) return cached

  const loaded = loadShiki(baseUrl)
  highlighters.set(baseUrl, loaded)
  return loaded
}

async function loadShiki(baseUrl: string) {
  const [shikiModule, monacoModule] = (await Promise.all([
    import(/* webpackIgnore: true */ `${baseUrl}/shiki@4.1.0?bundle`),
    import(/* webpackIgnore: true */ `${baseUrl}/@shikijs/monaco@4.1.0?bundle`),
  ])) as Array<Record<string, unknown>>
  const createHighlighter = shikiModule.createHighlighter as (options: {
    themes: string[]
    langs: string[]
  }) => Promise<ShikiHighlighter>
  const toMonacoTheme = monacoModule.textmateThemeToMonacoTheme as (
    theme: unknown,
  ) => MonacoThemeData

  return {
    highlighter: await createHighlighter({
      themes: ['one-dark-pro', 'one-light'],
      langs: [],
    }),
    toMonacoTheme,
    themes: new Map<string, MonacoThemeData>(),
  }
}

function withSemanticColors(theme: MonacoThemeData): MonacoThemeData {
  const colors = new Set<string>()
  for (const rule of theme.rules) {
    const foreground = normalizeColor(rule.foreground)
    if (foreground) colors.add(foreground)
  }
  const foreground = normalizeColor(theme.colors['editor.foreground'])
  if (foreground) colors.add(foreground)
  return { ...theme, semanticColors: [...colors].sort() }
}

function toSemanticTokens(lines: ShikiToken[][], colors: string[]) {
  const colorIndexes = new Map(colors.map((color, index) => [color, index]))
  const data: number[] = []
  let previousLine = 0
  let previousStart = 0

  lines.forEach((tokens, line) => {
    let column = 0
    for (const token of tokens) {
      const length = token.content.length
      const type = colorIndexes.get(normalizeColor(token.color) ?? '')
      if (type !== undefined && length > 0 && token.content.trim()) {
        const deltaLine = line - previousLine
        data.push(
          deltaLine,
          deltaLine === 0 ? column - previousStart : column,
          length,
          type,
          (token.fontStyle ?? 0) & 7,
        )
        previousLine = line
        previousStart = column
      }
      column += length
    }
  })

  return data
}

function normalizeColor(value: unknown) {
  if (typeof value !== 'string') return undefined
  const color = value.replace(/^#/, '').toLowerCase()
  return /^[\da-f]{6}(?:[\da-f]{2})?$/.test(color) ? color : undefined
}
