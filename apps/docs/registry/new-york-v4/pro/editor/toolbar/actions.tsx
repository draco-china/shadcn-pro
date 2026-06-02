import { Columns2, Eye, EyeOff } from 'lucide-react'
import type { ProToolbarItem } from '@/components/pro/base/toolbar'
import type {
  EditorToolbarAction,
  EditorToolbarActionContext,
  EditorToolbarOptions,
  EditorViewMode,
} from '../types'

interface GetEditorToolbarActionsOptions {
  hasPreview: boolean
  showBuiltInOptions: boolean
  modeControl?: boolean
  effectiveMode: EditorViewMode
  isSplitView: boolean
  setMode: (mode: EditorViewMode) => void
}

export function getEditorToolbarActions(
  actions: EditorToolbarAction[] | undefined,
  position: NonNullable<EditorToolbarAction['position']>,
) {
  return (actions ?? [])
    .filter((action) => (action.position ?? 'before') === position)
    .map(getToolbarActionItem)
}

export function getEditorToolbarActionGroups(actions: EditorToolbarAction[] | undefined) {
  return {
    before: getEditorToolbarActions(actions, 'before'),
    after: getEditorToolbarActions(actions, 'after'),
  }
}

export function getEditorCenterToolbarActions({
  hasPreview,
  showBuiltInOptions,
  modeControl,
  effectiveMode,
  isSplitView,
  setMode,
}: GetEditorToolbarActionsOptions): ProToolbarItem<EditorToolbarActionContext>[] {
  if (!hasPreview || !showBuiltInOptions || modeControl === false) return []

  return [
    {
      key: 'preview',
      icon: effectiveMode === 'preview' ? <EyeOff size={14} /> : <Eye size={14} />,
      tooltip: effectiveMode === 'preview' ? 'Hide Preview' : 'Preview',
      variant: effectiveMode === 'preview' ? 'secondary' : 'ghost',
      size: 'icon-xs',
      onClick: () => setMode(effectiveMode === 'preview' ? 'edit' : 'preview'),
    },
    {
      key: 'split',
      icon: <Columns2 size={14} />,
      tooltip: 'Split View',
      variant: isSplitView ? 'secondary' : 'ghost',
      size: 'icon-xs',
      onClick: () => setMode(effectiveMode === 'split' ? 'edit' : 'split'),
    },
  ]
}

export function isFullscreenControlEnabled(fullscreen: EditorToolbarFullscreenOption | undefined) {
  if (fullscreen === false) return false
  if (fullscreen && typeof fullscreen === 'object') return fullscreen.enabled ?? true
  return true
}

type EditorToolbarFullscreenOption =
  | boolean
  | NonNullable<Exclude<EditorToolbarOptions['options'], false>>['fullscreen']

function getToolbarActionItem(
  action: EditorToolbarAction,
): ProToolbarItem<EditorToolbarActionContext> {
  const { position, ...toolbarItem } = action
  return toolbarItem
}
