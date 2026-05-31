'use client'

import * as React from 'react'

export type ProFullscreenMode = 'fixed' | 'screen'

export interface UseProFullscreenOptions<TElement extends HTMLElement = HTMLElement> {
  fullscreen?: boolean
  defaultFullscreen?: boolean
  onFullscreenChange?: (fullscreen: boolean) => void
  mode?: ProFullscreenMode
  ref?: React.RefObject<TElement | null>
}

export function useProFullscreen<TElement extends HTMLElement = HTMLElement>({
  fullscreen: controlledFullscreen,
  defaultFullscreen = false,
  onFullscreenChange,
  mode = 'fixed',
  ref,
}: UseProFullscreenOptions<TElement> = {}) {
  const internalRef = React.useRef<TElement>(null)
  const targetRef = ref ?? internalRef
  const [uncontrolledFullscreen, setUncontrolledFullscreen] = React.useState(defaultFullscreen)
  const isControlled = controlledFullscreen !== undefined
  const fullscreen = controlledFullscreen ?? uncontrolledFullscreen

  const setFullscreen = React.useCallback(
    (nextFullscreen: boolean) => {
      if (!isControlled) setUncontrolledFullscreen(nextFullscreen)
      onFullscreenChange?.(nextFullscreen)
    },
    [isControlled, onFullscreenChange],
  )

  React.useEffect(() => {
    if (mode !== 'screen') return

    function handleFullscreenChange() {
      if (document.fullscreenElement !== targetRef.current) {
        setFullscreen(false)
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [mode, setFullscreen, targetRef])

  React.useEffect(() => {
    if (mode !== 'screen') return

    const element = targetRef.current
    if (!element) return

    if (fullscreen) {
      if (document.fullscreenElement !== element) {
        void element.requestFullscreen?.()
      }
      return
    }

    if (document.fullscreenElement === element) {
      void document.exitFullscreen?.()
    }
  }, [fullscreen, mode, targetRef])

  return {
    ref: targetRef,
    fullscreen,
    fullscreenMode: mode,
    isFixedFullscreen: fullscreen && mode === 'fixed',
    isScreenFullscreen: fullscreen && mode === 'screen',
    setFullscreen,
    toggleFullscreen: () => setFullscreen(!fullscreen),
  }
}
