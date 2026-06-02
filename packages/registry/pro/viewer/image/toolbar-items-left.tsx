import { RotateCcw, RotateCcwSquare, RotateCw, ZoomIn, ZoomOut } from 'lucide-react'
import { FullscreenButton } from '@/components/pro/base/button/fullscreen'
import type { ProToolbarItem } from '@/components/pro/base/toolbar'
import {
  imageToolbarButtonClassName,
  imageToolbarIconClassName,
  imageViewerToolbarScaleClassName,
} from './classes'
import { imageToolbarButton } from './toolbar-button'
import type { ImageViewerToolbarItemsOptions } from './toolbar-items'

export function getImageViewerLeftToolbarItems({
  scale,
  fullscreen,
  onZoomIn,
  onZoomOut,
  onRotateCcw,
  onRotateCw,
  onReset,
  onToggleFullscreen,
}: ImageViewerToolbarItemsOptions): ProToolbarItem[] {
  return [
    imageToolbarButton(
      'zoom-out',
      <ZoomOut className={imageToolbarIconClassName} />,
      'Zoom out',
      onZoomOut,
    ),
    {
      key: 'scale',
      render: () => (
        <span className={imageViewerToolbarScaleClassName}>{Math.round(scale * 100)}%</span>
      ),
    },
    imageToolbarButton(
      'zoom-in',
      <ZoomIn className={imageToolbarIconClassName} />,
      'Zoom in',
      onZoomIn,
    ),
    { key: 'zoom-separator', separator: true },
    imageToolbarButton(
      'rotate-ccw',
      <RotateCcw className={imageToolbarIconClassName} />,
      'Rotate counterclockwise',
      onRotateCcw,
    ),
    imageToolbarButton(
      'rotate-cw',
      <RotateCw className={imageToolbarIconClassName} />,
      'Rotate clockwise',
      onRotateCw,
    ),
    { key: 'rotate-separator', separator: true },
    imageToolbarButton(
      'reset',
      <RotateCcwSquare className={imageToolbarIconClassName} />,
      'Reset image',
      onReset,
    ),
    {
      key: 'fullscreen',
      render: () => (
        <FullscreenButton
          fullscreen={{
            value: fullscreen,
            enter: 'Enter fullscreen',
            exit: 'Exit fullscreen',
            onChange: onToggleFullscreen,
          }}
          variant="ghost"
          size="icon-sm"
          className={imageToolbarButtonClassName}
        />
      ),
    },
  ]
}
