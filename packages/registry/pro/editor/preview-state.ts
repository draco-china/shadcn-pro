'use client'

import { useCallback, useState } from 'react'
import type { EditorPreviewOptions, EditorViewMode } from './types'

export function useEditorPreviewState(preview?: EditorPreviewOptions) {
  const defaultMode = preview?.defaultMode ?? 'split'
  const [uncontrolledMode, setUncontrolledMode] = useState<EditorViewMode>(defaultMode)
  const PreviewComponent = preview?.component ?? null
  const hasPreview = PreviewComponent !== null
  const controlledMode = preview?.mode
  const mode = controlledMode ?? uncontrolledMode
  const effectiveMode = hasPreview ? mode : 'edit'
  const showEditorPane = effectiveMode !== 'preview'
  const showPreviewPane = hasPreview && effectiveMode !== 'edit'
  const isSplitView = showEditorPane && showPreviewPane

  const setMode = useCallback(
    (nextMode: EditorViewMode) => {
      const next = hasPreview ? nextMode : 'edit'
      if (controlledMode === undefined) setUncontrolledMode(next)
      preview?.onModeChange?.(next)
    },
    [controlledMode, hasPreview, preview],
  )

  return {
    PreviewComponent,
    hasPreview,
    effectiveMode,
    showEditorPane,
    showPreviewPane,
    isSplitView,
    setMode,
  }
}
