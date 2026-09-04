'use client'

import { type RefObject, useCallback, useEffect, useRef, useState } from 'react'

/** Manages controlled or uncontrolled fixed and browser fullscreen state. */
export function useFullscreen({
  fullscreen: controlledFullscreen,
  defaultFullscreen = false,
  onFullscreenChange,
  mode = 'fixed',
  ref,
}: {
  fullscreen?: boolean
  defaultFullscreen?: boolean
  onFullscreenChange?: (fullscreen: boolean) => void
  mode?: 'fixed' | 'screen'
  ref?: RefObject<HTMLDivElement | null>
} = {}) {
  const internalRef = useRef<HTMLDivElement>(null)
  const targetRef = ref ?? internalRef
  const [uncontrolledFullscreen, setUncontrolledFullscreen] = useState(defaultFullscreen)
  const fullscreen = controlledFullscreen ?? uncontrolledFullscreen

  const setFullscreen = useCallback(
    (nextFullscreen: boolean) => {
      if (controlledFullscreen === undefined) setUncontrolledFullscreen(nextFullscreen)
      onFullscreenChange?.(nextFullscreen)
    },
    [controlledFullscreen, onFullscreenChange],
  )

  useEffect(() => {
    if (mode !== 'screen') return

    function handleFullscreenChange() {
      if (document.fullscreenElement !== targetRef.current) {
        setFullscreen(false)
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [mode, setFullscreen, targetRef])

  useEffect(() => {
    if (mode !== 'screen') return

    const element = targetRef.current
    if (!element) return

    if (fullscreen) {
      if (document.fullscreenElement !== element) {
        element.requestFullscreen?.()?.catch(() => setFullscreen(false))
      }
      return
    }

    if (document.fullscreenElement === element) {
      document.exitFullscreen?.()?.catch(() => setFullscreen(true))
    }
  }, [fullscreen, mode, setFullscreen, targetRef])

  return {
    ref: targetRef,
    fullscreen,
    setFullscreen,
  }
}
