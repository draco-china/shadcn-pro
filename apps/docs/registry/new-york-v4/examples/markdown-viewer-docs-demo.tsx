import { MarkdownViewer } from "@/registry/new-york-v4/pro/pro-viewer/markdown"

const CONTENT = `# MarkdownViewer

Render **GitHub-flavored Markdown** with code blocks, tables, alerts, and safe HTML.

## Contents

> [!NOTE]
> This preview is intentionally short for the docs header.

\`\`\`tsx
<MarkdownViewer content={content} />
\`\`\`
`

export default function MarkdownViewerDocsDemo() {
  return (
    <div className="w-full p-4">
      <div className="rounded-lg border p-5">
        <MarkdownViewer content={CONTENT} theme="dark" />
      </div>
    </div>
  )
}
