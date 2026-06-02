import { type ComponentType, type RefObject, Suspense, type UIEvent } from 'react'
import { cn } from '@/lib/utils'
import { editorPreviewLoadingClassName, editorPreviewPaneClassName } from './classes'
import { scrollbarClassName } from './preview/styles'
import type { MonacoEditorInstance, PreviewProps } from './types'

interface PreviewPaneProps {
  content: string
  language: string
  split?: boolean
  component: ComponentType<PreviewProps>
  previewPaneRef: RefObject<HTMLDivElement | null>
  editor: MonacoEditorInstance | null
  setPreviewScrollElement: (element: HTMLDivElement | null) => void
  onPreviewScroll: (event: UIEvent<HTMLDivElement>, editor: MonacoEditorInstance | null) => void
}

export function PreviewPane({
  content,
  language,
  split,
  component: PreviewComponent,
  previewPaneRef,
  editor,
  setPreviewScrollElement,
  onPreviewScroll,
}: PreviewPaneProps) {
  return (
    <div
      ref={previewPaneRef}
      onScroll={(event) => onPreviewScroll(event, editor)}
      className={cn(editorPreviewPaneClassName, scrollbarClassName, split ? 'w-1/2' : 'w-full')}
    >
      <Suspense fallback={<div className={editorPreviewLoadingClassName}>Loading preview...</div>}>
        <PreviewComponent
          content={content}
          language={language}
          scrollContainerRef={setPreviewScrollElement}
          onScroll={(event) => onPreviewScroll(event, editor)}
        />
      </Suspense>
    </div>
  )
}
