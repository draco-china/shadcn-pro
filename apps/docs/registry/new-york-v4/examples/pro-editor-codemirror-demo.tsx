"use client"

import { useState } from "react"
import { ProEditor } from "@/registry/new-york-v4/pro/pro-editor/index"

const INITIAL = `import { useState } from "react"

interface User {
  id: number
  name: string
  email: string
}

export function UserCard({ user }: { user: User }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-lg border p-4">
      <h2 className="font-semibold">{user.name}</h2>
      {expanded && (
        <p className="text-sm text-muted-foreground">{user.email}</p>
      )}
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? "Collapse" : "Expand"}
      </button>
    </div>
  )
}
`

export default function ProEditorCodemirrorDemo() {
  const [value, setValue] = useState(INITIAL)
  return (
    <div className="w-full p-4">
      <ProEditor
        language="tsx"
        theme="one-dark-pro-flat"
        value={value}
        onChange={setValue}
        height={320}
      />
    </div>
  )
}
