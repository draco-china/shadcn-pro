import type { EditorToolbarOptions } from '../types'

export function getEditorToolbarBuiltInOptions(toolbar: false | EditorToolbarOptions | undefined) {
  return typeof toolbar === 'object' && toolbar.options !== false ? toolbar.options : undefined
}

export function getEditorToolbarFullscreenOption(
  toolbarBuiltInOptions: ReturnType<typeof getEditorToolbarBuiltInOptions>,
) {
  return toolbarBuiltInOptions && typeof toolbarBuiltInOptions.fullscreen === 'object'
    ? toolbarBuiltInOptions.fullscreen
    : undefined
}
