'use client'

import { type RefObject, useCallback, useEffect, useRef, useState } from 'react'

export type FullscreenMode = 'fixed' | 'screen'

export interface UseFullscreenOptions<TElement extends HTMLElement = HTMLElement> {
  fullscreen?: boolean
  defaultFullscreen?: boolean
  onFullscreenChange?: (fullscreen: boolean) => void
  mode?: FullscreenMode
  ref?: RefObject<TElement | null>
}

export function useFullscreen<TElement extends HTMLElement = HTMLElement>({
  fullscreen: controlledFullscreen,
  defaultFullscreen = false,
  onFullscreenChange,
  mode = 'fixed',
  ref,
}: UseFullscreenOptions<TElement> = {}) {
  const internalRef = useRef<TElement>(null)
  const targetRef = ref ?? internalRef
  const [uncontrolledFullscreen, setUncontrolledFullscreen] = useState(defaultFullscreen)
  const isControlled = controlledFullscreen !== undefined
  const fullscreen = controlledFullscreen ?? uncontrolledFullscreen

  const setFullscreen = useCallback(
    (nextFullscreen: boolean) => {
      if (!isControlled) setUncontrolledFullscreen(nextFullscreen)
      onFullscreenChange?.(nextFullscreen)
    },
    [isControlled, onFullscreenChange],
  )
  const toggleFullscreen = useCallback(() => {
    setFullscreen(!fullscreen)
  }, [fullscreen, setFullscreen])

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
        const request = element.requestFullscreen?.()
        void request?.catch(() => setFullscreen(false))
      }
      return
    }

    if (document.fullscreenElement === element) {
      const exit = document.exitFullscreen?.()
      void exit?.catch(() => setFullscreen(true))
    }
  }, [fullscreen, mode, targetRef])

  return {
    ref: targetRef,
    fullscreen,
    fullscreenMode: mode,
    isFixedFullscreen: fullscreen && mode === 'fixed',
    isScreenFullscreen: fullscreen && mode === 'screen',
    setFullscreen,
    toggleFullscreen,
  }
}
