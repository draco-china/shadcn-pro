'use client'

import { cn } from '@/lib/utils'
import { imageViewerAnnouncerClassName, imageViewerRootClassName } from './classes'
import { ImageViewerPortal } from './portal'
import { ImageViewerStage } from './stage'
import { getWheelZoomDelta } from './state'
import { ImageViewerThumbnails } from './thumbnails'
import { ImageViewerToolbar } from './toolbar'
import type { ImageViewerProps } from './types'
import { useImageViewer } from './use-image-viewer'

export type { ImageViewerProps } from './types'

export function ImageViewer({
  images,
  open,
  onClose,
  index: controlledIndex,
  initialIndex = 0,
  onIndexChange,
  alt = 'Image',
  container,
  className,
  toolbarClassName,
  thumbnailsClassName,
}: ImageViewerProps) {
  const viewer = useImageViewer({
    images,
    open,
    onClose,
    index: controlledIndex,
    initialIndex,
    onIndexChange,
  })

  if (!open || viewer.list.length === 0) return null

  return (
    <ImageViewerPortal container={container}>
      <div
        ref={viewer.containerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
        className={cn(imageViewerRootClassName, className)}
        onWheel={(event) => {
          event.preventDefault()
          viewer.zoomBy(getWheelZoomDelta(event.deltaY))
        }}
      >
        <ImageViewerToolbar
          scale={viewer.transform.scale}
          count={viewer.list.length}
          index={viewer.index}
          fullscreen={viewer.fullscreen}
          className={toolbarClassName}
          onZoomIn={() => viewer.zoomBy(viewer.scaleStep)}
          onZoomOut={() => viewer.zoomBy(-viewer.scaleStep)}
          onRotateCcw={() => viewer.rotateBy(-90)}
          onRotateCw={() => viewer.rotateBy(90)}
          onReset={viewer.reset}
          onToggleFullscreen={viewer.toggleFullscreen}
          onClose={onClose}
        />

        <span className={imageViewerAnnouncerClassName} aria-live="polite" aria-atomic="true">
          Image {viewer.index + 1} of {viewer.list.length}
        </span>

        <ImageViewerStage
          images={viewer.list}
          index={viewer.index}
          alt={alt}
          dragging={viewer.dragging}
          imageStyle={viewer.imageStyle}
          onMouseDown={viewer.handleMouseDown}
          onMouseMove={viewer.handleMouseMove}
          onStopDrag={viewer.stopDrag}
          onPrev={viewer.prev}
          onNext={viewer.next}
        />

        <ImageViewerThumbnails
          images={viewer.list}
          index={viewer.index}
          alt={alt}
          className={thumbnailsClassName}
          onSelect={viewer.select}
        />
      </div>
    </ImageViewerPortal>
  )
}
