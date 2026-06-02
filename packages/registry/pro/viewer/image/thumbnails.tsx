'use client'

import { ProButton } from '@/components/pro/base/button'
import { cn } from '@/lib/utils'
import {
  imageViewerThumbnailButtonClassName,
  imageViewerThumbnailImageClassName,
  imageViewerThumbnailsClassName,
} from './classes'

export interface ImageViewerThumbnailsProps {
  images: string[]
  index: number
  alt: string
  className?: string
  onSelect: (index: number) => void
}

export function ImageViewerThumbnails({
  images,
  index,
  alt,
  className,
  onSelect,
}: ImageViewerThumbnailsProps) {
  if (images.length <= 1) return null

  const occurrenceBySrc = new Map<string, number>()
  const thumbnails = images.map((src) => {
    const occurrence = (occurrenceBySrc.get(src) ?? 0) + 1
    occurrenceBySrc.set(src, occurrence)
    return { key: `${src}-${occurrence}`, src }
  })

  return (
    <div className={cn(imageViewerThumbnailsClassName, className)}>
      {thumbnails.map(({ key, src }, imageIndex) => (
        <ProButton
          key={key}
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onSelect(imageIndex)}
          className={cn(
            imageViewerThumbnailButtonClassName,
            imageIndex === index
              ? 'border-primary'
              : 'border-transparent opacity-50 hover:opacity-80',
          )}
          aria-label={`Open ${alt} ${imageIndex + 1}`}
        >
          <img
            src={src}
            alt={`${alt} thumbnail ${imageIndex + 1}`}
            className={imageViewerThumbnailImageClassName}
          />
        </ProButton>
      ))}
    </div>
  )
}
