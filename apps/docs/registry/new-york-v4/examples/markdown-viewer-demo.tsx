'use client'

import { MarkdownViewer } from '@/registry/new-york-v4/pro/pro-viewer/markdown'

const SAMPLE_MD = `# MarkdownViewer

A GitHub-style markdown renderer with **GFM**, raw HTML sanitization, alerts, footnotes, task lists, and math.

Autolinks work: https://github.com/draco-china/shadcn-pro

## Contents

## GitHub Alerts

> [!NOTE]
> Useful information that users should know.

> [!TIP]
> Helpful advice for getting more value.

> [!IMPORTANT]
> Key information users need to know.

> [!WARNING]
> Urgent info that needs attention.

> [!CAUTION]
> Risky or negative consequences.

## Formatting

Text can be **bold**, _italic_, ~~struck through~~, \`inline code\`, and split with soft
line breaks like GitHub comments.

## Code Example

\`\`\`typescript
function greet(name: string) {
  return \`Hello, \${name}!\`
}
\`\`\`

## Math

Inline math: $E = mc^2$

\`\`\`math
\\int_0^1 x^2\\,dx = \\frac{1}{3}
\`\`\`

## Table

| Name     | Type     | Default |
| -------- | -------- | ------- |
| content  | string   | —       |
| className| string   | —       |

## Task List

- [x] MarkdownViewer
- [x] CodeViewer
- [ ] More components…

## Footnotes

Here is a footnote reference.[^note]

[^note]: Footnotes are provided by GitHub Flavored Markdown.

## HTML

<details>
  <summary>Sanitized raw HTML</summary>
  <p>GitHub-compatible raw HTML is rendered through a sanitize pipeline.</p>
</details>
`

export default function MarkdownViewerDemo() {
  return (
    <div className="w-full p-6">
      <div className="mb-3">
        <h3 className="text-base font-semibold">MarkdownViewer</h3>
        <p className="text-sm text-muted-foreground">
          GitHub-style Markdown renderer — GFM, alerts, footnotes, math, and safe HTML.
        </p>
      </div>
      <div className="rounded-lg border p-6">
        <MarkdownViewer content={SAMPLE_MD} theme="dark" />
      </div>
    </div>
  )
}
