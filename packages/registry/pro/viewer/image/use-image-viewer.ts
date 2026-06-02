'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFullscreen } from '@/components/pro/base/hooks/use-fullscreen'
import {
  getBoundedImageIndex,
  getImageTransformStyle,
  IMAGE_SCALE_STEP,
  normalizeImages,
} from './state'
import type { ImageViewerProps } from './types'
import { useImageDrag } from './use-image-drag'
import { useImageKeyboard } from './use-image-keyboard'
import { useImageTransform } from './use-image-transform'

export function useImageViewer({
  images,
  open,
  onClose,
  index: controlledIndex,
  initialIndex = 0,
  onIndexChange,
}: Pick<
  ImageViewerProps,
  'images' | 'open' | 'onClose' | 'index' | 'initialIndex' | 'onIndexChange'
>) {
  const list = normalizeImages(images)
  const isControlled = controlledIndex !== undefined
  const [uncontrolledIndex, setUncontrolledIndex] = useState(initialIndex)
  const fullscreen = useFullscreen<HTMLDivElement>({ mode: 'screen' })
  const index = getBoundedImageIndex(
    isControlled ? controlledIndex : uncontrolledIndex,
    list.length,
  )
  const transformState = useImageTransform()
  const drag = useImageDrag({
    transform: transformState.transform,
    setTransform: transformState.setTransform,
  })
  const imageStyle = useMemo(
    () => getImageTransformStyle(transformState.transform, drag.dragging),
    [drag.dragging, transformState.transform],
  )

  const select = useCallback(
    (nextIndex: number) => {
      if (!list.length) return
      const normalizedIndex = (nextIndex + list.length) % list.length
      if (!isControlled) setUncontrolledIndex(normalizedIndex)
      onIndexChange?.(normalizedIndex)
      transformState.reset()
    },
    [isControlled, list.length, onIndexChange, transformState.reset],
  )
  const prev = useCallback(
    () => select((index - 1 + list.length) % list.length),
    [index, list.length, select],
  )
  const next = useCallback(() => select((index + 1) % list.length), [index, list.length, select])
  useImageKeyboard({ open, onClose, onPrev: prev, onNext: next })

  useEffect(() => {
    if (!open) return
    if (!isControlled) setUncontrolledIndex(initialIndex)
    transformState.reset()
  }, [open, initialIndex, isControlled, transformState.reset])

  return {
    containerRef: fullscreen.ref,
    list,
    index,
    transform: transformState.transform,
    imageStyle,
    fullscreen: fullscreen.fullscreen,
    dragging: drag.dragging,
    reset: transformState.reset,
    select,
    prev,
    next,
    zoomBy: transformState.zoomBy,
    rotateBy: transformState.rotateBy,
    toggleFullscreen: fullscreen.toggleFullscreen,
    handleMouseDown: drag.handleMouseDown,
    handleMouseMove: drag.handleMouseMove,
    stopDrag: drag.stopDrag,
    scaleStep: IMAGE_SCALE_STEP,
  }
}
