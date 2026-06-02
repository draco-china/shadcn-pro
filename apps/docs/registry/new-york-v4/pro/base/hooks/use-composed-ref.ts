import { type Ref, type RefCallback, useCallback } from 'react'

function setRef<TValue>(ref: Ref<TValue> | undefined, value: TValue | null) {
  if (!ref) return
  if (typeof ref === 'function') {
    ref(value)
    return
  }
  ref.current = value
}

export function useComposedRef<TValue>(...refs: (Ref<TValue> | undefined)[]): RefCallback<TValue> {
  return useCallback((value) => {
    refs.forEach((ref) => {
      setRef(ref, value)
    })
  }, refs)
}
