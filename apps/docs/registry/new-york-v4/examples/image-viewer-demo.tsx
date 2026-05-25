'use client'

import { ImageViewer } from '@/registry/new-york-v4/pro/pro-viewer/image'
import { useState } from 'react'

const IMAGES = [
  'https://picsum.photos/seed/viewer1/800/600',
  'https://picsum.photos/seed/viewer2/800/600',
  'https://picsum.photos/seed/viewer3/800/600',
  'https://picsum.photos/seed/viewer4/800/600',
  'https://picsum.photos/seed/viewer5/800/600',
  'https://picsum.photos/seed/viewer6/800/600',
]

export default function ImageViewerDemo() {
  const [open, setOpen] = useState(false)
  const [startIndex, setStartIndex] = useState(0)

  function openAt(i: number) {
    setStartIndex(i)
    setOpen(true)
  }

  return (
    <div className="w-full p-4">
      <div className="mb-3">
        <h3 className="text-base font-semibold">ImageViewer</h3>
        <p className="text-sm text-muted-foreground">Click any image to preview. Supports zoom, rotate, drag, fullscreen, and multi-image navigation.</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {IMAGES.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => openAt(i)}
            className="group aspect-video overflow-hidden rounded-lg border bg-muted transition-opacity hover:opacity-90"
          >
            <img
              src={src}
              alt={`Photo ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <ImageViewer
        images={IMAGES}
        open={open}
        onClose={() => setOpen(false)}
        initialIndex={startIndex}
        alt="Photo"
      />
    </div>
  )
}
