import type { CSSProperties, MouseEventHandler } from 'react'
import { cn } from '@/lib/utils'
import { imageViewerImageClassName, imageViewerStageClassName } from './classes'
import { ImageNav } from './nav'

interface ImageViewerStageProps {
  images: string[]
  index: number
  alt: string
  dragging: boolean
  imageStyle?: CSSProperties
  onMouseDown: MouseEventHandler<HTMLDivElement>
  onMouseMove: MouseEventHandler<HTMLDivElement>
  onStopDrag: () => void
  onPrev: () => void
  onNext: () => void
}

export function ImageViewerStage({
  images,
  index,
  alt,
  dragging,
  imageStyle,
  onMouseDown,
  onMouseMove,
  onStopDrag,
  onPrev,
  onNext,
}: ImageViewerStageProps) {
  return (
    <div
      role="none"
      className={cn(imageViewerStageClassName, dragging ? 'cursor-grabbing' : 'cursor-grab')}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onStopDrag}
      onMouseLeave={onStopDrag}
    >
      {images.length > 1 && <ImageNav direction="prev" onClick={onPrev} />}
      <img
        src={images[index]}
        alt={`${alt} ${index + 1}`}
        draggable={false}
        className={imageViewerImageClassName}
        style={imageStyle}
      />
      {images.length > 1 && <ImageNav direction="next" onClick={onNext} />}
    </div>
  )
}
