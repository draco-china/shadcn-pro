import { useEffect, useState } from 'react'
import {
  DEFAULT_MARKDOWN_CDN,
  type MarkdownRoot,
  type MarkdownWorkerRequest,
  type MarkdownWorkerResponse,
} from './plugins'

interface PendingRequest {
  resolve: (tree: MarkdownRoot) => void
  reject: (error: Error) => void
}

let markdownWorker: Worker | undefined
let nextRequestId = 0
const pendingRequests = new Map<number, PendingRequest>()

function getMarkdownWorker() {
  if (markdownWorker) return markdownWorker

  markdownWorker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' })
  markdownWorker.onmessage = ({ data }: MessageEvent<MarkdownWorkerResponse>) => {
    const request = pendingRequests.get(data.id)
    if (!request) return

    pendingRequests.delete(data.id)
    if ('error' in data) request.reject(new Error(data.error))
    else request.resolve(data.tree)
  }
  markdownWorker.onerror = () => {
    const error = new Error('Markdown parser worker failed')
    for (const request of pendingRequests.values()) request.reject(error)
    pendingRequests.clear()
    markdownWorker?.terminate()
    markdownWorker = undefined
  }
  return markdownWorker
}

function parseMarkdown(content: string, cdnBaseUrl: string) {
  return new Promise<MarkdownRoot>((resolve, reject) => {
    const id = ++nextRequestId
    pendingRequests.set(id, { resolve, reject })
    const request: MarkdownWorkerRequest = { id, content, cdnBaseUrl }
    getMarkdownWorker().postMessage(request)
  })
}

/** Parse Markdown off the main thread with CDN-loaded, cached plugins. */
export function useMarkdownWorker(content: string, cdnBaseUrl = DEFAULT_MARKDOWN_CDN) {
  const [state, setState] = useState<{
    tree?: MarkdownRoot
    error?: Error
    loading: boolean
  }>({ loading: Boolean(content.trim()) })

  useEffect(() => {
    let active = true
    if (!content.trim()) {
      setState({ loading: false })
      return
    }

    setState((current) => ({ ...current, error: undefined, loading: true }))
    void parseMarkdown(content, cdnBaseUrl).then(
      (tree) => {
        if (active) setState({ tree, loading: false })
      },
      (error: Error) => {
        if (active) setState({ error, loading: false })
      },
    )

    return () => {
      active = false
    }
  }, [cdnBaseUrl, content])

  return state
}
