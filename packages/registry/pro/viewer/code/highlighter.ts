import type {
  HighlightToken,
  HighlightWorkerRequest,
  HighlightWorkerResponse,
} from './highlight-types'

const DEFAULT_SHIKI_CDN = 'https://esm.sh'

interface PendingHighlight {
  resolve: (lines: HighlightToken[][]) => void
  reject: (error: Error) => void
}

let highlightWorker: Worker | undefined
let nextHighlightId = 0
const pendingHighlights = new Map<number, PendingHighlight>()

/** Highlights code in a shared Worker with CDN-loaded Shiki. */
export function highlightCode(
  code: string,
  lang: string,
  theme: 'light' | 'dark',
  cdnBaseUrl = DEFAULT_SHIKI_CDN,
) {
  return new Promise<HighlightToken[][]>((resolve, reject) => {
    const id = ++nextHighlightId
    pendingHighlights.set(id, { resolve, reject })
    const request: HighlightWorkerRequest = { id, code, lang, theme, cdnBaseUrl }
    getHighlightWorker().postMessage(request)
  })
}

function getHighlightWorker() {
  if (highlightWorker) return highlightWorker

  highlightWorker = new Worker(new URL('./highlight-worker.ts', import.meta.url), {
    type: 'module',
  })
  highlightWorker.onmessage = ({ data }: MessageEvent<HighlightWorkerResponse>) => {
    const request = pendingHighlights.get(data.id)
    if (!request) return

    pendingHighlights.delete(data.id)
    if ('error' in data) request.reject(new Error(data.error))
    else request.resolve(data.lines)
  }
  highlightWorker.onerror = () => {
    const error = new Error('Syntax highlight worker failed')
    for (const request of pendingHighlights.values()) request.reject(error)
    pendingHighlights.clear()
    highlightWorker?.terminate()
    highlightWorker = undefined
  }
  return highlightWorker
}
