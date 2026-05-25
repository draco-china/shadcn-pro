import type * as React from 'react'
import { useCallback, useEffect, useRef } from 'react'
import type { MonacoEditorInstance } from '../types'

export function useEditorPreviewScrollSync() {
  const previewPaneRef = useRef<HTMLDivElement | null>(null)
  const previewScrollElementRef = useRef<HTMLDivElement | null>(null)
  const scrollDisposableRef = useRef<{ dispose: () => void } | null>(null)
  const syncSourceRef = useRef<'editor' | 'preview' | null>(null)
  const syncEnabledRef = useRef(false)

  const setPreviewScrollElement = useCallback((node: HTMLDivElement | null) => {
    previewScrollElementRef.current = node
  }, [])

  const getPreviewScrollElement = useCallback(() => {
    return previewScrollElementRef.current ?? previewPaneRef.current
  }, [])

  const releaseSyncLock = useCallback(() => {
    window.requestAnimationFrame(() => {
      syncSourceRef.current = null
    })
  }, [])

  const syncPreviewFromEditor = useCallback(
    (editor: MonacoEditorInstance) => {
      if (!syncEnabledRef.current || syncSourceRef.current === 'preview') return
      const previewElement = getPreviewScrollElement()
      if (!previewElement) return

      const editorMaxScrollTop = Math.max(
        editor.getScrollHeight() - editor.getLayoutInfo().height,
        0,
      )
      const previewMaxScrollTop = Math.max(
        previewElement.scrollHeight - previewElement.clientHeight,
        0,
      )
      if (editorMaxScrollTop <= 0 || previewMaxScrollTop <= 0) return

      syncSourceRef.current = 'editor'
      previewElement.scrollTop = (editor.getScrollTop() / editorMaxScrollTop) * previewMaxScrollTop
      releaseSyncLock()
    },
    [getPreviewScrollElement, releaseSyncLock],
  )

  const handlePreviewScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>, editor: MonacoEditorInstance | null) => {
      if (!syncEnabledRef.current || syncSourceRef.current === 'editor' || !editor) return

      const previewElement = event.currentTarget
      const previewMaxScrollTop = Math.max(
        previewElement.scrollHeight - previewElement.clientHeight,
        0,
      )
      const editorMaxScrollTop = Math.max(
        editor.getScrollHeight() - editor.getLayoutInfo().height,
        0,
      )
      if (previewMaxScrollTop <= 0 || editorMaxScrollTop <= 0) return

      syncSourceRef.current = 'preview'
      editor.setScrollTop((previewElement.scrollTop / previewMaxScrollTop) * editorMaxScrollTop)
      releaseSyncLock()
    },
    [releaseSyncLock],
  )

  const setSyncEnabled = useCallback((enabled: boolean) => {
    syncEnabledRef.current = enabled
  }, [])

  useEffect(() => () => scrollDisposableRef.current?.dispose(), [])

  return {
    previewPaneRef,
    scrollDisposableRef,
    setPreviewScrollElement,
    syncPreviewFromEditor,
    handlePreviewScroll,
    setSyncEnabled,
  }
}
