import type { CSSProperties } from 'react'

export interface ImageTransform {
  scale: number
  rotate: number
  x: number
  y: number
}

export const DEFAULT_IMAGE_TRANSFORM: ImageTransform = { scale: 1, rotate: 0, x: 0, y: 0 }
export const MIN_IMAGE_SCALE = 0.1
export const MAX_IMAGE_SCALE = 5
export const IMAGE_SCALE_STEP = 0.25

export function normalizeImages(images: string | string[]) {
  return Array.isArray(images) ? images : [images]
}

export function getBoundedImageIndex(index: number, count: number) {
  return Math.min(Math.max(index, 0), count - 1)
}

export function clampScale(scale: number) {
  return Math.min(MAX_IMAGE_SCALE, Math.max(MIN_IMAGE_SCALE, scale))
}

export function getImageTransformStyle(
  transform: ImageTransform,
  dragging: boolean,
): CSSProperties {
  return {
    transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale}) rotate(${transform.rotate}deg)`,
    transition: dragging ? 'none' : 'transform 0.15s ease',
  }
}

export function getWheelZoomDelta(deltaY: number) {
  return deltaY > 0 ? -IMAGE_SCALE_STEP : IMAGE_SCALE_STEP
}
