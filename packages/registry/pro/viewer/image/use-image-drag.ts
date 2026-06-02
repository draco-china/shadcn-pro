'use client'

import type { Dispatch, MouseEvent, SetStateAction } from 'react'
import { useCallback, useRef, useState } from 'react'
import type { ImageTransform } from './state'

interface UseImageDragOptions {
  transform: ImageTransform
  setTransform: Dispatch<SetStateAction<ImageTransform>>
}

export function useImageDrag({ transform, setTransform }: UseImageDragOptions) {
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef<{
    x: number
    y: number
    tx: number
    ty: number
  } | null>(null)
  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
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
    (event: MouseEvent) => {
      if (!dragging || !dragStart.current) return
      const start = dragStart.current
      setTransform((current) => ({
        ...current,
        x: start.tx + event.clientX - start.x,
        y: start.ty + event.clientY - start.y,
      }))
    },
    [dragging, setTransform],
  )
  const stopDrag = useCallback(() => {
    setDragging(false)
    dragStart.current = null
  }, [])

  return {
    dragging,
    handleMouseDown,
    handleMouseMove,
    stopDrag,
  }
}
