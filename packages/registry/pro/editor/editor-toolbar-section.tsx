import { EditorToolbar } from './toolbar'
import {
  getEditorCenterToolbarActions,
  getEditorToolbarActionGroups,
  isFullscreenControlEnabled,
} from './toolbar/actions'
import type { EditorProps } from './types'
import type { useEditorState } from './use-editor-state'

interface EditorToolbarSectionProps {
  editor: ReturnType<typeof useEditorState>
  toolbar: EditorProps['toolbar']
  language: NonNullable<EditorProps['language']>
}

export function EditorToolbarSection({ editor, toolbar, language }: EditorToolbarSectionProps) {
  if (toolbar === false) return null

  const toolbarActionGroups = getEditorToolbarActionGroups(
    typeof toolbar === 'object' ? toolbar.actions : undefined,
  )
  const centerToolbarActions = getEditorCenterToolbarActions({
    hasPreview: editor.hasPreview,
    showBuiltInOptions: editor.showBuiltInToolbarOptions,
    modeControl: editor.toolbarBuiltInOptions?.mode,
    effectiveMode: editor.effectiveMode,
    isSplitView: editor.isSplitView,
    setMode: editor.setMode,
  })

  return (
    <EditorToolbar
      language={language}
      fullscreen={editor.fullscreen}
      context={editor.toolbarContext}
      title={typeof toolbar === 'object' ? toolbar.title : undefined}
      centerActions={centerToolbarActions}
      actions={toolbarActionGroups.before}
      afterActions={toolbarActionGroups.after}
      format={editor.showBuiltInToolbarOptions && (editor.toolbarBuiltInOptions?.format ?? true)}
      copy={editor.showBuiltInToolbarOptions && (editor.toolbarBuiltInOptions?.copy ?? true)}
      fullscreenControl={
        editor.showBuiltInToolbarOptions &&
        isFullscreenControlEnabled(editor.toolbarBuiltInOptions?.fullscreen)
      }
      onFormat={editor.handleFormat}
      onFullscreenChange={editor.setFullscreen}
    />
  )
}
