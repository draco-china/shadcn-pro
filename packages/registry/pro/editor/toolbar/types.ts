import type { ProToolbarContent, ProToolbarItem } from '@/components/pro/base/toolbar'
import type {
  EditorFullscreenMode,
  EditorTheme,
  EditorViewMode,
  MonacoEditorInstance,
} from '../core-types'

export interface EditorToolbarOptions {
  title?: ProToolbarContent<EditorToolbarActionContext>
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

export type EditorToolbarAction = ProToolbarItem<EditorToolbarActionContext> & {
  /**
   * `before` renders in the right region before built-in format/copy/fullscreen controls.
   * `after` renders after the built-in right controls.
   */
  position?: 'before' | 'after'
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
