import { codeViewerStatusClassName } from './classes'

export interface CodeViewerStatusProps {
  loading: boolean
  failed: boolean
  emptyText: string
}

export function CodeViewerStatus({ loading, failed, emptyText }: CodeViewerStatusProps) {
  return (
    <div className={codeViewerStatusClassName}>
      {loading ? 'Loading...' : failed ? 'Unable to highlight code' : emptyText}
    </div>
  )
}
