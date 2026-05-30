"use client"

import { useState } from "react"
import { ProEditor } from "@/registry/new-york-v4/pro/pro-editor/index"

const INITIAL = `function fibonacci(n: number): number {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

const result = Array.from({ length: 10 }, (_, i) => fibonacci(i))
console.log(result)
// Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
`

export default function ProEditorMonacoDemo() {
  const [value, setValue] = useState(INITIAL)
  return (
    <div className="h-[360px] w-full p-4">
      <ProEditor
        language="typescript"
        theme="one-dark-pro"
        themeMode="dark"
        value={value}
        onChange={setValue}
      />
    </div>
  )
}
