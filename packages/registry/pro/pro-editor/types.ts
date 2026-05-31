import type MonacoEditor from '@monaco-editor/react'
import type * as React from 'react'
import type { ProFullscreenMode } from '@/components/pro/pro-base'
import type { ProToolbarItem } from '@/components/pro/pro-toolbar'

export type EditorTheme = 'light' | 'dark'

/** Props passed to a custom preview component */
export interface PreviewProps {
  content: string
  language: string
  scrollContainerRef?: React.Ref<HTMLDivElement>
  onScroll?: React.UIEventHandler<HTMLDivElement>
}

export interface EditorProps {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  /** Language id (e.g. tsx, typescript, javascript, python, markdown) */
  language: string
  /** Force light or dark variant — defaults to system/page theme via next-themes */
  theme?: EditorTheme
  className?: string
  height?: string | number
  /** Integrated toolbar config. Pass `false` to hide the toolbar. */
  toolbar?: false | EditorToolbarOptions
  /**
   * Preview config. Pass a component to enable preview/split mode.
   * When omitted, the editor renders edit-only mode.
   */
  preview?: EditorPreviewOptions
}

export interface EditorPreviewOptions {
  component: React.ComponentType<PreviewProps>
  /** Controlled preview pane mode */
  mode?: EditorViewMode
  /** Initial preview pane mode for uncontrolled usage */
  defaultMode?: EditorViewMode
  /** Called when the toolbar requests a preview pane mode change */
  onModeChange?: (mode: EditorViewMode) => void
}

export interface EditorToolbarOptions {
  actions?: EditorToolbarAction[]
  options?:
    | false
    | {
        mode?: boolean
        format?: boolean
        copy?: boolean
        fullscreen?: boolean | EditorToolbarFullscreenOptions
      }
}

export interface EditorToolbarFullscreenOptions {
  enabled?: boolean
  value?: boolean
  defaultValue?: boolean
  onChange?: (fullscreen: boolean) => void
  mode?: EditorFullscreenMode
}

export type MonacoEditorInstance = Parameters<
  NonNullable<React.ComponentProps<typeof MonacoEditor>['onMount']>
>[0]

export type EditorViewMode = 'edit' | 'preview' | 'split'
export type EditorFullscreenMode = ProFullscreenMode

export type EditorToolbarAction = ProToolbarItem<EditorToolbarActionContext> & {
  position?: 'start' | 'before' | 'after'
}

export interface EditorToolbarActionContext {
  value: string
  disabled: boolean
  language: string
  theme: EditorTheme
  mode: EditorViewMode
  hasPreview: boolean
  isSplitView: boolean
  fullscreen: boolean
  fullscreenMode: EditorFullscreenMode
  editor: MonacoEditorInstance | null
  format: () => void
  setMode: (mode: EditorViewMode) => void
  setFullscreen: (fullscreen: boolean) => void
}
