'use client'

import { EditorContent } from './editor-content'
import { EditorShell } from './editor-shell'
import { EditorToolbarSection } from './editor-toolbar-section'
import type { EditorProps } from './types'
import { useEditorState } from './use-editor-state'

export type {
  EditorFullscreenMode,
  EditorPreviewOptions,
  EditorProps,
  EditorToolbarAction,
  EditorToolbarActionContext,
  EditorToolbarFullscreenOptions,
  EditorToolbarOptions,
  EditorViewMode,
  PreviewProps,
} from './types'

export function ProEditor({
  value,
  onChange,
  disabled = false,
  language = 'plaintext',
  theme = 'dark',
  className,
  height,
  toolbar,
  preview,
}: EditorProps) {
  const editor = useEditorState({
    value,
    onChange,
    disabled,
    language,
    theme,
    height,
    toolbar,
    preview,
  })

  return (
    <EditorShell editor={editor} className={className}>
      <EditorToolbarSection editor={editor} toolbar={toolbar} language={language} />
      <EditorContent editor={editor} language={language} theme={theme} disabled={disabled} />
    </EditorShell>
  )
}
