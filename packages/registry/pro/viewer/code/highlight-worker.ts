import type {
  HighlightToken,
  HighlightWorkerRequest,
  HighlightWorkerResponse,
} from './highlight-types'

interface WorkerScope {
  onmessage: ((event: MessageEvent<HighlightWorkerRequest>) => void) | null
  postMessage(message: HighlightWorkerResponse): void
}

interface ShikiModule {
  bundledLanguages: Record<string, unknown>
  codeToTokensBase(
    code: string,
    options: { lang: string; theme: string },
  ): Promise<HighlightToken[][]>
}

const workerScope = self as unknown as WorkerScope
const shikiModules = new Map<string, Promise<ShikiModule>>()

workerScope.onmessage = async ({ data }) => {
  try {
    const shiki = await getShiki(data.cdnBaseUrl)
    const lang = getBundledLanguage(data.lang, shiki.bundledLanguages)
    const lines = await shiki.codeToTokensBase(data.code, {
      lang,
      theme: data.theme === 'dark' ? 'one-dark-pro' : 'one-light',
    })
    workerScope.postMessage({ id: data.id, lines })
  } catch (error) {
    workerScope.postMessage({
      id: data.id,
      error: error instanceof Error ? error.message : 'Unable to highlight code',
    })
  }
}

function getShiki(cdnBaseUrl: string) {
  const baseUrl = cdnBaseUrl.replace(/\/+$/, '')
  const cached = shikiModules.get(baseUrl)
  if (cached) return cached

  const loaded = import(
    /* webpackIgnore: true */ `${baseUrl}/shiki@4.1.0?bundle`
  ) as Promise<ShikiModule>
  shikiModules.set(baseUrl, loaded)
  return loaded
}

function getBundledLanguage(lang: string, bundledLanguages: Record<string, unknown>) {
  const normalized = lang.toLowerCase()
  if (normalized in bundledLanguages) return normalized
  if (normalized === 'typescript' || normalized === 'ts') return 'tsx'
  if (normalized === 'javascript' || normalized === 'js') return 'jsx'
  return 'javascript'
}
