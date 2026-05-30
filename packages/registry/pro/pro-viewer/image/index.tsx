'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  clampScale,
  DEFAULT_IMAGE_TRANSFORM,
  IMAGE_SCALE_STEP,
  type ImageTransform,
  normalizeImages,
} from './state'
import { ImageViewerThumbnails } from './thumbnails'
import { ImageViewerToolbar } from './toolbar'

export interface ImageViewerProps {
  images: string | string[]
  open: boolean
  onClose: () => void
  index?: number
  initialIndex?: number
  onIndexChange?: (index: number) => void
  alt?: string
  container?: Element | DocumentFragment | null
  className?: string
  toolbarClassName?: string
  thumbnailsClassName?: string
}

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
  const list = normalizeImages(images)
  const isControlled = controlledIndex !== undefined
  const [uncontrolledIndex, setUncontrolledIndex] = useState(initialIndex)
  const [transform, setTransform] = useState<ImageTransform>(DEFAULT_IMAGE_TRANSFORM)
  const [fullscreen, setFullscreen] = useState(false)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef<{
    x: number
    y: number
    tx: number
    ty: number
  } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const index = Math.min(
    Math.max(isControlled ? controlledIndex : uncontrolledIndex, 0),
    list.length - 1,
  )

  const reset = useCallback(() => setTransform(DEFAULT_IMAGE_TRANSFORM), [])
  const select = useCallback(
    (nextIndex: number) => {
      if (!list.length) return
      const normalizedIndex = (nextIndex + list.length) % list.length
      if (!isControlled) setUncontrolledIndex(normalizedIndex)
      onIndexChange?.(normalizedIndex)
      reset()
    },
    [isControlled, list.length, onIndexChange, reset],
  )
  const prev = useCallback(
    () => select((index - 1 + list.length) % list.length),
    [index, list.length, select],
  )
  const next = useCallback(() => select((index + 1) % list.length), [index, list.length, select])
  const zoomBy = useCallback((delta: number) => {
    setTransform((current) => ({
      ...current,
      scale: clampScale(current.scale + delta),
    }))
  }, [])
  const rotateBy = useCallback((delta: number) => {
    setTransform((current) => ({ ...current, rotate: current.rotate + delta }))
  }, [])

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) await containerRef.current?.requestFullscreen()
    else await document.exitFullscreen()
  }, [])

  useEffect(() => {
    if (!open) return
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') prev()
      if (event.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose, prev, next])

  useEffect(() => {
    const handler = () => setFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  useEffect(() => {
    if (!open) return
    if (!isControlled) setUncontrolledIndex(initialIndex)
    reset()
  }, [open, initialIndex, isControlled, reset])

  useEffect(() => {
    const image = imageRef.current
    if (!image) return
    image.style.transform = `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale}) rotate(${transform.rotate}deg)`
    image.style.transition = dragging ? 'none' : 'transform 0.15s ease'
  }, [dragging, transform])

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      setDragging(true)
      dragStart.current = {
        x: event.clientX,
        y: event.clientY,
        tx: transform.x,
        ty: transform.y,
      }
    },
    [transform],
  )

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (!dragging || !dragStart.current) return
      const start = dragStart.current
      setTransform((current) => ({
        ...current,
        x: start.tx + event.clientX - start.x,
        y: start.ty + event.clientY - start.y,
      }))
    },
    [dragging],
  )

  const stopDrag = useCallback(() => {
    setDragging(false)
    dragStart.current = null
  }, [])

  if (!open || list.length === 0) return null

  const content = (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className={cn('fixed inset-0 z-50 flex flex-col bg-background/95 text-foreground', className)}
      onWheel={(event) => {
        event.preventDefault()
        zoomBy(event.deltaY > 0 ? -IMAGE_SCALE_STEP : IMAGE_SCALE_STEP)
      }}
    >
      <ImageViewerToolbar
        scale={transform.scale}
        count={list.length}
        index={index}
        fullscreen={fullscreen}
        className={toolbarClassName}
        onZoomIn={() => zoomBy(IMAGE_SCALE_STEP)}
        onZoomOut={() => zoomBy(-IMAGE_SCALE_STEP)}
        onRotateCcw={() => rotateBy(-90)}
        onRotateCw={() => rotateBy(90)}
        onReset={reset}
        onToggleFullscreen={toggleFullscreen}
        onClose={onClose}
      />

      <span className="sr-only" aria-live="polite" aria-atomic="true">
        Image {index + 1} of {list.length}
      </span>

      <div
        role="none"
        className={cn(
          'relative flex flex-1 items-center justify-center overflow-hidden',
          dragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {list.length > 1 && <ImageNav direction="prev" onClick={prev} />}
        <img
          ref={imageRef}
          src={list[index]}
          alt={`${alt} ${index + 1}`}
          draggable={false}
          className="max-h-full max-w-full select-none object-contain"
        />
        {list.length > 1 && <ImageNav direction="next" onClick={next} />}
      </div>

      <ImageViewerThumbnails
        images={list}
        index={index}
        alt={alt}
        className={thumbnailsClassName}
        onSelect={select}
      />
    </div>
  )

  const portalTarget =
    container === undefined ? (typeof document === 'undefined' ? null : document.body) : container
  return portalTarget ? createPortal(content, portalTarget) : content
}

function ImageNav({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`absolute z-10 size-10 rounded-full bg-background/70 text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground ${
        direction === 'prev' ? 'left-4' : 'right-4'
      }`}
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
      aria-label={direction === 'prev' ? 'Previous image' : 'Next image'}
    >
      <Icon className="size-5" />
    </Button>
  )
}
