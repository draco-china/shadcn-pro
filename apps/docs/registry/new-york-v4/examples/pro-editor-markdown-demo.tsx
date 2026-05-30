"use client"

import { useState } from "react"
import { ProEditor } from "@/registry/new-york-v4/pro/pro-editor/index"
import type { PreviewProps } from "@/registry/new-york-v4/pro/pro-editor/index"
import { MarkdownViewer } from "@/registry/new-york-v4/pro/pro-viewer/markdown"

const EDITOR_THEME = "one-dark-pro-flat" as const

const INITIAL = `# Getting Started

Welcome to **ProEditor** — Monaco-powered markdown editing with live preview.

## Features

- Full GFM (GitHub Flavored Markdown) support
- GitHub Flavored Markdown preview
- Tables, task lists, and strikethrough

## Example Table

| Prop | Type | Default |
| --- | --- | --- |
| value | string | — |
| onChange | function | — |
| height | number | 300 |

> Tip: Monaco handles large markdown files with excellent performance.
`

function MarkdownPreview({ content }: PreviewProps) {
  return <MarkdownViewer content={content} theme={EDITOR_THEME} className="p-4" />
}

export default function ProEditorMarkdownDemo() {
  const [value, setValue] = useState(INITIAL)

  return (
    <div className="w-full p-4">
      <ProEditor
        language="markdown"
        theme={EDITOR_THEME}
        value={value}
        onChange={setValue}
        preview={MarkdownPreview}
        height={380}
      />
    </div>
  )
}
