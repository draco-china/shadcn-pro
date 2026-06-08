'use client'

import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCcwSquare,
  RotateCw,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import { type MouseEvent, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import { ProButton } from '../../base/button'
import { useFullscreen } from '../../base/hooks/use-fullscreen'

const DEFAULT_IMAGE_TRANSFORM = { scale: 1, rotate: 0, x: 0, y: 0 }
const IMAGE_SCALE_STEP = 0.25

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
}: {
  images: string | string[]
  open: boolean
  onClose: () => void
  index?: number
  initialIndex?: number
  onIndexChange?: (index: number) => void
  alt?: string
  container?: Element | DocumentFragment | null
  className?: string
}) {
  const list = Array.isArray(images) ? images : [images]
  const [uncontrolledIndex, setUncontrolledIndex] = useState(initialIndex)
  const fullscreen = useFullscreen({ mode: 'screen' })
  const index = Math.min(Math.max(controlledIndex ?? uncontrolledIndex, 0), list.length - 1)
  const [transform, setTransform] =
    useState<typeof DEFAULT_IMAGE_TRANSFORM>(DEFAULT_IMAGE_TRANSFORM)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef<{
    x: number
    y: number
    tx: number
    ty: number
  } | null>(null)
  function reset() {
    setTransform(DEFAULT_IMAGE_TRANSFORM)
  }

  function zoomBy(delta: number) {
    setTransform((current) => ({
      ...current,
      scale: Math.min(5, Math.max(0.1, current.scale + delta)),
    }))
  }

  function rotateBy(delta: number) {
    setTransform((current) => ({ ...current, rotate: current.rotate + delta }))
  }

  function select(nextIndex: number) {
    if (!list.length) return
    const normalizedIndex = (nextIndex + list.length) % list.length
    if (controlledIndex === undefined) setUncontrolledIndex(normalizedIndex)
    onIndexChange?.(normalizedIndex)
    reset()
  }

  function handleMouseDown(event: MouseEvent) {
    setDragging(true)
    dragStart.current = {
      x: event.clientX,
      y: event.clientY,
      tx: transform.x,
      ty: transform.y,
    }
  }

  function handleMouseMove(event: MouseEvent) {
    if (!dragging || !dragStart.current) return
    const start = dragStart.current
    setTransform((current) => ({
      ...current,
      x: start.tx + event.clientX - start.x,
      y: start.ty + event.clientY - start.y,
    }))
  }

  function stopDrag() {
    setDragging(false)
    dragStart.current = null
  }

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') select(index - 1)
      if (event.key === 'ArrowRight') select(index + 1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose, index, list.length, controlledIndex, onIndexChange])

  useEffect(() => {
    if (!open) return
    if (controlledIndex === undefined) setUncontrolledIndex(initialIndex)
    reset()
  }, [open, initialIndex, controlledIndex])

  if (!open || list.length === 0) return null

  const portalTarget =
    container === undefined ? (typeof document !== 'undefined' ? document.body : null) : container

  const hasMultipleImages = list.length > 1

  const content = (
    <div
      ref={fullscreen.ref}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className={cn('fixed inset-0 z-50 flex flex-col bg-background/95 text-foreground', className)}
      onWheel={(event) => {
        event.preventDefault()
        zoomBy(event.deltaY > 0 ? -IMAGE_SCALE_STEP : IMAGE_SCALE_STEP)
      }}
    >
      <div className="flex flex-wrap items-center gap-2 px-4 py-3 text-foreground">
        <ProButton variant="ghost" tooltip="Zoom out" onClick={() => zoomBy(-IMAGE_SCALE_STEP)}>
          <ZoomOut className="size-4" />
        </ProButton>
        <span className="min-w-[48px] text-center text-sm tabular-nums">
          {Math.round(transform.scale * 100)}%
        </span>
        <ProButton variant="ghost" tooltip="Zoom in" onClick={() => zoomBy(IMAGE_SCALE_STEP)}>
          <ZoomIn className="size-4" />
        </ProButton>
        <div aria-hidden="true" className="mx-1 hidden h-5 w-px shrink-0 bg-border sm:block" />
        <ProButton variant="ghost" tooltip="Rotate counterclockwise" onClick={() => rotateBy(-90)}>
          <RotateCcw className="size-4" />
        </ProButton>
        <ProButton variant="ghost" tooltip="Rotate clockwise" onClick={() => rotateBy(90)}>
          <RotateCw className="size-4" />
        </ProButton>
        <div aria-hidden="true" className="mx-1 hidden h-5 w-px shrink-0 bg-border sm:block" />
        <ProButton variant="ghost" tooltip="Reset image" onClick={reset}>
          <RotateCcwSquare className="size-4" />
        </ProButton>
        <ProButton
          variant="ghost"
          tooltip={fullscreen.fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          onClick={() => fullscreen.setFullscreen(!fullscreen.fullscreen)}
        >
          {fullscreen.fullscreen ? (
            <Minimize2 className="size-4" />
          ) : (
            <Maximize2 className="size-4" />
          )}
        </ProButton>
        <span className="hidden flex-1 md:block" />
        {hasMultipleImages && (
          <span className="text-sm text-muted-foreground">
            {index + 1} / {list.length}
          </span>
        )}
        <span className="hidden flex-1 md:block" />
        <ProButton variant="ghost" tooltip="Close image viewer" onClick={onClose}>
          <X className="size-5" />
        </ProButton>
      </div>

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
        {hasMultipleImages && (
          <>
            <ProButton
              variant="ghost"
              size="icon"
              className="absolute left-4 z-10 size-10 rounded-full bg-background/70 text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
              onClick={(event) => {
                event.stopPropagation()
                select(index - 1)
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="size-5" />
            </ProButton>
            <ProButton
              variant="ghost"
              size="icon"
              className="absolute right-4 z-10 size-10 rounded-full bg-background/70 text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
              onClick={(event) => {
                event.stopPropagation()
                select(index + 1)
              }}
              aria-label="Next image"
            >
              <ChevronRight className="size-5" />
            </ProButton>
          </>
        )}
        <img
          src={list[index]}
          alt={`${alt} ${index + 1}`}
          draggable={false}
          className="max-h-full max-w-full select-none object-contain"
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale}) rotate(${transform.rotate}deg)`,
            transition: dragging ? 'none' : 'transform 0.15s ease',
          }}
        />
      </div>

      {hasMultipleImages && (
        <div className="flex justify-center gap-2 px-4 py-3">
          {list.map((src, imageIndex) => (
            <ProButton
              // biome-ignore lint/suspicious/noArrayIndexKey: thumbnail identity follows the ordered image list
              key={`${src}-${imageIndex}`}
              variant="ghost"
              size="icon"
              onClick={() => select(imageIndex)}
              className={cn(
                'size-12 overflow-hidden rounded border-2 transition-colors',
                imageIndex === index
                  ? 'border-primary'
                  : 'border-transparent opacity-50 hover:opacity-80',
              )}
              aria-label={`Open ${alt} ${imageIndex + 1}`}
            >
              <img
                src={src}
                alt={`${alt} thumbnail ${imageIndex + 1}`}
                className="size-full object-cover"
              />
            </ProButton>
          ))}
        </div>
      )}
    </div>
  )

  if (portalTarget) return createPortal(content, portalTarget)
  return content
}
