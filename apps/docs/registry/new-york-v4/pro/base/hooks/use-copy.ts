'use client'

import { useCallback, useEffect, useState } from 'react'

export type CopyStatus = 'idle' | 'copying' | 'success' | 'error'

export interface CopyOptions {
  text: string | (() => string | Promise<string>)
  resetDuration?: number
  onSuccess?: (text: string) => void | Promise<void>
  onError?: (error: unknown) => void | Promise<void>
}

export function useCopy(options?: CopyOptions) {
  const [status, setStatus] = useState<CopyStatus>('idle')

  useEffect(() => {
    const resetDuration = options?.resetDuration ?? 2000
    if ((status !== 'success' && status !== 'error') || resetDuration <= 0) return
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => setStatus('idle'), resetDuration)
    return () => clearTimeout(timer)
  }, [status, options?.resetDuration])

  const copy = useCallback(async () => {
    if (!options || status === 'copying') return false

    setStatus('copying')
    try {
      const text = typeof options.text === 'function' ? await options.text() : options.text
      await copyToClipboard(text)
      setStatus('success')
      await options.onSuccess?.(text)
      return true
    } catch (error) {
      setStatus('error')
      await options.onError?.(error)
      return false
    }
  }, [options, status])

  const reset = useCallback(() => setStatus('idle'), [])

  return {
    copy,
    reset,
    status,
    copying: status === 'copying',
    copied: status === 'success',
    failed: status === 'error',
  }
}

async function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.top = '-9999px'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()

  try {
    const copied = document.execCommand('copy')
    if (!copied) throw new Error('Copy command was rejected.')
  } finally {
    document.body.removeChild(textarea)
  }
}
