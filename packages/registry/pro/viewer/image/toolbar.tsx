'use client'

import { ProToolbar } from '@/components/pro/base/toolbar'
import { cn } from '@/lib/utils'
import { imageViewerToolbarClassName } from './classes'
import { getImageViewerToolbarItems } from './toolbar-items'

export interface ImageViewerToolbarProps {
  scale: number
  count: number
  index: number
  fullscreen: boolean
  className?: string
  onZoomIn: () => void
  onZoomOut: () => void
  onRotateCcw: () => void
  onRotateCw: () => void
  onReset: () => void
  onToggleFullscreen: () => void
  onClose: () => void
}

export function ImageViewerToolbar({
  scale,
  count,
  index,
  fullscreen,
  className,
  onZoomIn,
  onZoomOut,
  onRotateCcw,
  onRotateCw,
  onReset,
  onToggleFullscreen,
  onClose,
}: ImageViewerToolbarProps) {
  const items = getImageViewerToolbarItems({
    scale,
    count,
    index,
    fullscreen,
    onZoomIn,
    onZoomOut,
    onRotateCcw,
    onRotateCw,
    onReset,
    onToggleFullscreen,
    onClose,
  })

  return (
    <ProToolbar
      className={cn(imageViewerToolbarClassName, className)}
      left={{ options: items.left, className: 'gap-1' }}
      center={{ options: items.center }}
      right={{ options: items.right }}
    />
  )
}
