'use client'

import { useCallback, useState } from 'react'
import { clampScale, DEFAULT_IMAGE_TRANSFORM, type ImageTransform } from './state'

export function useImageTransform() {
  const [transform, setTransform] = useState<ImageTransform>(DEFAULT_IMAGE_TRANSFORM)
  const reset = useCallback(() => setTransform(DEFAULT_IMAGE_TRANSFORM), [])
  const zoomBy = useCallback((delta: number) => {
    setTransform((current) => ({
      ...current,
      scale: clampScale(current.scale + delta),
    }))
  }, [])
  const rotateBy = useCallback((delta: number) => {
    setTransform((current) => ({ ...current, rotate: current.rotate + delta }))
  }, [])

  return {
    transform,
    setTransform,
    reset,
    zoomBy,
    rotateBy,
  }
}
