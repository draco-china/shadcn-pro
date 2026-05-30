import type MonacoEditor from '@monaco-editor/react'
import type * as React from 'react'

export type EditorTheme =
  | 'github-light'
  | 'github-dark'
  | 'one-dark-pro-flat'
  | 'one-dark-pro-flat-light'

export const EDITOR_THEMES: { value: EditorTheme; label: string }[] = [
  { value: 'github-light', label: 'GitHub Light' },
  { value: 'github-dark', label: 'GitHub Dark' },
  { value: 'one-dark-pro-flat-light', label: 'One Dark Pro Light' },
  { value: 'one-dark-pro-flat', label: 'One Dark Pro' },
]

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
  /** Language id (e.g. tsx, typescript, javascript, python, markdown) */
  language: string
  /** Syntax theme is owned by the application and passed into the editor */
  theme?: EditorTheme
  className?: string
  height?: string | number
  /** Show the integrated toolbar (default: true) */
  showToolbar?: boolean
  /** Controlled view mode */
  viewMode?: EditorViewMode
  /** Initial view mode for uncontrolled usage */
  defaultViewMode?: EditorViewMode
  /** Called when the toolbar requests a mode change */
  onViewModeChange?: (viewMode: EditorViewMode) => void
  /** Custom content rendered before the toolbar language label */
  toolbarBefore?: EditorToolbarRender
  /** Extra toolbar actions rendered before the built-in format/copy/fullscreen actions */
  toolbarActions?: EditorToolbarRender
  /** Custom content rendered after the built-in toolbar actions */
  toolbarAfter?: EditorToolbarRender
  /**
   * Preview component rendered in the right pane. Receives `{ content, language }`.
   * Pass a component to enable preview/split mode. When omitted, the editor renders edit-only mode.
   */
  preview?: React.ComponentType<PreviewProps>
}

export type MonacoEditorInstance = Parameters<
  NonNullable<React.ComponentProps<typeof MonacoEditor>['onMount']>
>[0]

export type EditorViewMode = 'edit' | 'preview' | 'split'

export type EditorToolbarRender =
  | React.ReactNode
  | ((context: EditorToolbarActionContext) => React.ReactNode)

export interface EditorToolbarActionContext {
  value: string
  language: string
  theme: EditorTheme
  viewMode: EditorViewMode
  hasPreview: boolean
  isSplitView: boolean
  copied: boolean
  fullscreen: boolean
  editor: MonacoEditorInstance | null
  format: () => void
  copy: () => Promise<void>
  setViewMode: (viewMode: EditorViewMode) => void
  setFullscreen: React.Dispatch<React.SetStateAction<boolean>>
}
