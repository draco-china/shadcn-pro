'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseCountdownOptions {
  duration: number
  interval?: number
}

export interface UseCountdownReturn {
  remaining: number
  running: boolean
  start: () => void
  stop: () => void
}

export function useCountdown({
  duration,
  interval = 250,
}: UseCountdownOptions): UseCountdownReturn {
  const deadlineRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [remaining, setRemaining] = useState(0)

  const stop = useCallback(() => {
    deadlineRef.current = 0
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setRemaining(0)
  }, [])

  const tick = useCallback(() => {
    const nextRemaining = Math.max(deadlineRef.current - Date.now(), 0)
    setRemaining(nextRemaining)
    if (nextRemaining === 0) stop()
  }, [stop])

  const start = useCallback(() => {
    stop()
    if (duration <= 0) return
    deadlineRef.current = Date.now() + duration
    setRemaining(duration)
    timerRef.current = setInterval(tick, interval)
  }, [duration, interval, stop, tick])

  useEffect(() => stop, [stop])

  return {
    remaining,
    running: remaining > 0,
    start,
    stop,
  }
}
