'use client'

import { useEffect } from 'react'
import { useFullscreen } from '@/components/pro/base/hooks/use-fullscreen'
import { getEditorLayout } from './layout'
import { useEditorPreviewScrollSync } from './preview/scroll-sync'
import { useEditorPreviewState } from './preview-state'
import { getEditorToolbarBuiltInOptions, getEditorToolbarFullscreenOption } from './toolbar/options'
import type { EditorProps, EditorToolbarActionContext } from './types'
import { useEditorValue } from './use-editor-value'
import { useMonacoEditor } from './use-monaco-editor'

export function useEditorState({
  value,
  onChange,
  disabled,
  language = 'plaintext',
  theme,
  height,
  toolbar,
  preview,
}: Pick<
  EditorProps,
  'value' | 'onChange' | 'disabled' | 'language' | 'theme' | 'height' | 'toolbar' | 'preview'
>) {
  const { localValue, handleChange } = useEditorValue({ value, onChange, disabled })
  const toolbarBuiltInOptions = getEditorToolbarBuiltInOptions(toolbar)
  const showBuiltInToolbarOptions = toolbar !== false
  const fullscreenOption = getEditorToolbarFullscreenOption(toolbarBuiltInOptions)
  const fullscreenMode = fullscreenOption?.mode ?? 'fixed'
  const fullscreenState = useFullscreen<HTMLDivElement>({
    fullscreen: fullscreenOption?.value,
    defaultFullscreen: fullscreenOption?.defaultValue,
    onFullscreenChange: fullscreenOption?.onChange,
    mode: fullscreenMode,
  })
  const previewState = useEditorPreviewState(preview)
  const previewScroll = useEditorPreviewScrollSync()
  const monacoEditor = useMonacoEditor({ disabled, theme, previewScroll })

  const layout = getEditorLayout({
    height,
    fullscreen: fullscreenState.fullscreen,
    fixedFullscreen: fullscreenState.isFixedFullscreen,
  })

  useEffect(() => {
    previewScroll.setSyncEnabled(previewState.isSplitView)
  }, [previewState.isSplitView, previewScroll])

  const toolbarContext: EditorToolbarActionContext = {
    value: localValue,
    disabled: disabled ?? false,
    language,
    theme: theme ?? 'dark',
    mode: previewState.effectiveMode,
    hasPreview: previewState.hasPreview,
    isSplitView: previewState.isSplitView,
    fullscreen: fullscreenState.fullscreen,
    fullscreenMode,
    editor: monacoEditor.editorRef.current,
    format: monacoEditor.handleFormat,
    setMode: previewState.setMode,
    setFullscreen: fullscreenState.setFullscreen,
  }

  return {
    localValue,
    toolbarBuiltInOptions,
    showBuiltInToolbarOptions,
    fullscreenMode,
    rootRef: fullscreenState.ref,
    fullscreen: fullscreenState.fullscreen,
    isFixedFullscreen: fullscreenState.isFixedFullscreen,
    isScreenFullscreen: fullscreenState.isScreenFullscreen,
    setFullscreen: fullscreenState.setFullscreen,
    contentStyle: layout.contentStyle,
    contentFillsParent: layout.contentFillsParent,
    rootStyle: layout.rootStyle,
    PreviewComponent: previewState.PreviewComponent,
    hasPreview: previewState.hasPreview,
    effectiveMode: previewState.effectiveMode,
    showEditorPane: previewState.showEditorPane,
    showPreviewPane: previewState.showPreviewPane,
    isSplitView: previewState.isSplitView,
    toolbarContext,
    editorRef: monacoEditor.editorRef,
    previewScroll,
    handleChange,
    handleMount: monacoEditor.handleMount,
    handleFormat: monacoEditor.handleFormat,
    setMode: previewState.setMode,
  }
}
