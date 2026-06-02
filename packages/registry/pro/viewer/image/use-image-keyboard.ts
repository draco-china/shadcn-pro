'use client'

import { useEffect } from 'react'

export interface UseImageKeyboardOptions {
  open?: boolean
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function useImageKeyboard({ open, onClose, onPrev, onNext }: UseImageKeyboardOptions) {
  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev()
      if (event.key === 'ArrowRight') onNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose, onPrev, onNext])
}
