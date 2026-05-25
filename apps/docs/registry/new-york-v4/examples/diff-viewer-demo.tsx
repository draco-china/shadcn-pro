'use client'

import { DiffViewer } from '@/registry/new-york-v4/pro/pro-viewer/diff'

const OLD = `import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}

export default Counter`

const NEW = `import { useState, useCallback } from 'react'

interface CounterProps {
  initialCount?: number
  step?: number
}

function Counter({ initialCount = 0, step = 1 }: CounterProps) {
  const [count, setCount] = useState(initialCount)

  const increment = useCallback(() => setCount((c) => c + step), [step])
  const decrement = useCallback(() => setCount((c) => c - step), [step])
  const reset = useCallback(() => setCount(initialCount), [initialCount])

  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-semibold">Count: {count}</p>
      <div className="flex gap-2">
        <button type="button" onClick={decrement}>-</button>
        <button type="button" onClick={increment}>+</button>
        <button type="button" onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

export default Counter`

export default function DiffViewerDemo() {
  return (
    <div className="w-full p-4">
      <div className="mb-3">
        <h3 className="text-base font-semibold">DiffViewer</h3>
        <p className="text-sm text-muted-foreground">
          Split and unified view, line-level diff with added/removed line counts.
        </p>
      </div>
      <DiffViewer
        oldCode={OLD}
        newCode={NEW}
        oldTitle="Counter.tsx (before)"
        newTitle="Counter.tsx (after)"
      />
    </div>
  )
}
