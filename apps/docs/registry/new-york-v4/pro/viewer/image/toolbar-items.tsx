import type { ProToolbarItem } from '@/components/pro/base/toolbar'
import { getImageViewerCenterToolbarItems } from './toolbar-items-center'
import { getImageViewerLeftToolbarItems } from './toolbar-items-left'
import { getImageViewerRightToolbarItems } from './toolbar-items-right'

export interface ImageViewerToolbarItemsOptions {
  scale: number
  count: number
  index: number
  fullscreen: boolean
  onZoomIn: () => void
  onZoomOut: () => void
  onRotateCcw: () => void
  onRotateCw: () => void
  onReset: () => void
  onToggleFullscreen: () => void
  onClose: () => void
}

export function getImageViewerToolbarItems(options: ImageViewerToolbarItemsOptions) {
  return {
    left: getImageViewerLeftToolbarItems(options),
    center: getImageViewerCenterToolbarItems(options),
    right: getImageViewerRightToolbarItems(options),
  } satisfies Record<'left' | 'center' | 'right', ProToolbarItem[]>
}
