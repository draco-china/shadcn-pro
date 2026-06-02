'use client'

import type { Monaco } from '@monaco-editor/react'
import { useCallback, useEffect, useRef } from 'react'
import { applyShadcnTheme, configureTypescript } from './monaco'
import type { useEditorPreviewScrollSync } from './preview/scroll-sync'
import type { EditorTheme, MonacoEditorInstance } from './types'

export function useMonacoEditor({
  disabled,
  theme,
  previewScroll,
}: {
  disabled?: boolean
  theme?: EditorTheme
  previewScroll: ReturnType<typeof useEditorPreviewScrollSync>
}) {
  const themeRef = useRef(theme ?? 'dark')
  const editorRef = useRef<MonacoEditorInstance | null>(null)
  const monacoRef = useRef<Monaco | null>(null)

  useEffect(() => {
    themeRef.current = theme ?? 'dark'
  }, [theme])

  const handleMount = useCallback(
    (editor: MonacoEditorInstance, monaco: Monaco) => {
      editorRef.current = editor
      monacoRef.current = monaco
      previewScroll.scrollDisposableRef.current?.dispose()
      previewScroll.scrollDisposableRef.current = editor.onDidScrollChange(() =>
        previewScroll.syncPreviewFromEditor(editor),
      )
      configureTypescript(monaco)
      void applyShadcnTheme(monaco, themeRef.current)
    },
    [previewScroll],
  )

  useEffect(() => {
    const monaco = monacoRef.current
    if (monaco) void applyShadcnTheme(monaco, theme ?? 'dark')
  }, [theme])

  const handleFormat = useCallback(() => {
    if (disabled) return
    editorRef.current?.getAction('editor.action.formatDocument')?.run()
  }, [disabled])

  return {
    editorRef,
    handleMount,
    handleFormat,
  }
}
