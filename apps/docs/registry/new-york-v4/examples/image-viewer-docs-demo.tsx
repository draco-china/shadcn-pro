"use client"

import { useState } from "react"

import { ImageViewer } from "@/registry/new-york-v4/pro/pro-viewer/image"

const IMAGES = [
  "https://picsum.photos/seed/docs-viewer-1/800/600",
  "https://picsum.photos/seed/docs-viewer-2/800/600",
  "https://picsum.photos/seed/docs-viewer-3/800/600",
]

export default function ImageViewerDocsDemo() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-3 gap-2">
        {IMAGES.map((src, currentIndex) => (
          <button
            key={src}
            type="button"
            className="aspect-video overflow-hidden rounded-lg border bg-muted"
            onClick={() => {
              setIndex(currentIndex)
              setOpen(true)
            }}
          >
            <img src={src} alt={`Preview ${currentIndex + 1}`} className="size-full object-cover" />
          </button>
        ))}
      </div>
      <ImageViewer images={IMAGES} open={open} onClose={() => setOpen(false)} initialIndex={index} />
    </div>
  )
}
