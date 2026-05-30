"use client"

import { useState } from "react"

import { ProEditor } from "@/registry/new-york-v4/pro/pro-editor/index"

const INITIAL_CODE = `type Status = "draft" | "published"

export function publish(status: Status) {
  return status === "draft" ? "Ready to publish" : "Already live"
}
`

export default function ProEditorDocsDemo() {
  const [value, setValue] = useState(INITIAL_CODE)

  return (
    <div className="h-[360px] w-full p-4">
      <ProEditor
        language="typescript"
        theme="one-dark-pro"
        themeMode="dark"
        value={value}
        onChange={setValue}
        toolbarBefore={
          <span className="rounded-sm bg-background px-2 py-0.5 text-xs text-muted-foreground">
            TypeScript
          </span>
        }
      />
    </div>
  )
}
