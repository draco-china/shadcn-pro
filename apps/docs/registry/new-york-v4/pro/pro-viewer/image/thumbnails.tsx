'use client'

import { cn } from '@/lib/utils'

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

  return (
    <div className={cn('flex justify-center gap-2 px-4 py-3', className)}>
      {images.map((src, imageIndex) => (
        <button
          key={src}
          type="button"
          onClick={() => onSelect(imageIndex)}
          className={`size-12 overflow-hidden rounded border-2 transition-colors ${
            imageIndex === index ? 'border-primary' : 'border-transparent opacity-50 hover:opacity-80'
          }`}
          aria-label={`Open ${alt} ${imageIndex + 1}`}
        >
          <img
            src={src}
            alt={`${alt} thumbnail ${imageIndex + 1}`}
            className="size-full object-cover"
          />
        </button>
      ))}
    </div>
  )
}
