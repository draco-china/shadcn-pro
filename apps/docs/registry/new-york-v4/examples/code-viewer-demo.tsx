'use client'

import { CodeViewer } from '@/registry/new-york-v4/pro/pro-viewer/code'

const SAMPLE_CODE = `import { useState, useCallback } from 'react'

interface Todo {
  id: number
  text: string
  done: boolean
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])

  const add = useCallback((text: string) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, done: false },
    ])
  }, [])

  const toggle = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    )
  }, [])

  const remove = useCallback((id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { todos, add, toggle, remove }
}`

export default function CodeViewerDemo() {
  return (
    <div className="w-full p-4">
      <div className="mb-3">
        <h3 className="text-base font-semibold">CodeViewer</h3>
        <p className="text-sm text-muted-foreground">
          Read-only syntax-highlighted code viewer with copy, line numbers, and multi-language theme support.
        </p>
      </div>
      <CodeViewer
        code={SAMPLE_CODE}
        lang="typescript"
        title="useTodos.ts"
        showLineNumbers
      />
    </div>
  )
}
