import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { editorShellFrameClassName, editorShellRootClassName } from './classes'
import type { useEditorState } from './use-editor-state'

interface EditorShellProps {
  editor: ReturnType<typeof useEditorState>
  className?: string
  children: ReactNode
}

export function EditorShell({ editor, className, children }: EditorShellProps) {
  return (
    <div
      ref={editor.rootRef}
      className={cn(
        editorShellRootClassName,
        editor.contentFillsParent && 'h-full',
        editor.isScreenFullscreen && 'bg-background',
        className,
      )}
      style={editor.rootStyle}
    >
      <div
        className={cn(
          editorShellFrameClassName,
          editor.contentFillsParent && 'h-full min-h-0',
          editor.isFixedFullscreen && 'fixed inset-0 z-50 h-full rounded-none border-0',
          editor.isScreenFullscreen && 'h-screen rounded-none border-0',
        )}
      >
        {children}
      </div>
    </div>
  )
}
