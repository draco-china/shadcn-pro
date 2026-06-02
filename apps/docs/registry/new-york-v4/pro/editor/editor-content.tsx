import { cn } from '@/lib/utils'
import { editorContentClassName } from './classes'
import { EditorPane } from './editor-pane'
import { PreviewPane } from './preview-pane'
import type { EditorProps } from './types'
import type { useEditorState } from './use-editor-state'

interface EditorContentProps {
  editor: ReturnType<typeof useEditorState>
  language: NonNullable<EditorProps['language']>
  theme: NonNullable<EditorProps['theme']>
  disabled: NonNullable<EditorProps['disabled']>
}

export function EditorContent({ editor, language, theme, disabled }: EditorContentProps) {
  return (
    <div
      className={cn(
        editorContentClassName,
        editor.contentFillsParent && 'flex-1',
        editor.isSplitView && 'divide-x divide-input',
      )}
      style={editor.contentStyle}
    >
      {editor.showEditorPane && (
        <EditorPane
          value={editor.localValue}
          language={language}
          theme={theme}
          disabled={disabled}
          split={editor.isSplitView}
          onMount={editor.handleMount}
          onChange={editor.handleChange}
        />
      )}

      {editor.showPreviewPane && editor.PreviewComponent && (
        <PreviewPane
          content={editor.localValue}
          language={language}
          split={editor.isSplitView}
          component={editor.PreviewComponent}
          previewPaneRef={editor.previewScroll.previewPaneRef}
          editor={editor.editorRef.current}
          setPreviewScrollElement={editor.previewScroll.setPreviewScrollElement}
          onPreviewScroll={editor.previewScroll.handlePreviewScroll}
        />
      )}
    </div>
  )
}
