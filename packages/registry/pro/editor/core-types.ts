import type { editor } from 'monaco-editor'
import type { FullscreenMode } from '@/components/pro/base/hooks/use-fullscreen'

export type EditorTheme = 'light' | 'dark'

export type MonacoEditorInstance = editor.IStandaloneCodeEditor

export type EditorViewMode = 'edit' | 'preview' | 'split'

export type EditorFullscreenMode = FullscreenMode
