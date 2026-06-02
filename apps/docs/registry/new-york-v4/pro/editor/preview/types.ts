import type { ComponentType, Ref, UIEventHandler } from 'react'
import type { EditorViewMode } from '../core-types'

/** Props passed to a custom preview component */
export interface PreviewProps {
  content: string
  language: string
  scrollContainerRef?: Ref<HTMLDivElement>
  onScroll?: UIEventHandler<HTMLDivElement>
}

export interface EditorPreviewOptions {
  component: ComponentType<PreviewProps>
  /** Controlled preview pane mode */
  mode?: EditorViewMode
  /** Initial preview pane mode for uncontrolled usage */
  defaultMode?: EditorViewMode
  /** Called when the toolbar requests a preview pane mode change */
  onModeChange?: (mode: EditorViewMode) => void
}
