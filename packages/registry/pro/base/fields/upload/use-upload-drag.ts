'use client'

import { type DragEvent, useState } from 'react'
import type { UploadSelectedFiles } from './types'

export function useUploadDrag({
  disabled,
  onDrop,
}: {
  disabled?: boolean
  onDrop: (files: UploadSelectedFiles | null) => void
}) {
  const [dragging, setDragging] = useState(false)

  function handleDragOver(event: DragEvent<HTMLElement>) {
    event.preventDefault()
    if (!disabled) setDragging(true)
  }

  function handleDrop(event: DragEvent<HTMLElement>) {
    event.preventDefault()
    setDragging(false)
    if (!disabled) onDrop(event.dataTransfer.files)
  }

  return {
    dragging,
    handleDragOver,
    handleDragLeave: () => setDragging(false),
    handleDrop,
  }
}
