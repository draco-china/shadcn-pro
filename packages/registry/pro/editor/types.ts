import type { EditorTheme } from './core-types'
import type { EditorPreviewOptions } from './preview/types'
import type { EditorToolbarOptions } from './toolbar/types'

export type {
  EditorFullscreenMode,
  EditorTheme,
  EditorViewMode,
  MonacoEditorInstance,
} from './core-types'
export type { EditorPreviewOptions, PreviewProps } from './preview/types'
export type {
  EditorToolbarAction,
  EditorToolbarActionContext,
  EditorToolbarFullscreenOptions,
  EditorToolbarOptions,
} from './toolbar/types'

export interface EditorProps {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  /** Language id (e.g. tsx, typescript, javascript, python, markdown) */
  language?: string
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
