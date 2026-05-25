import { CodeViewer } from "@/registry/new-york-v4/pro/pro-viewer/code"

const CODE = `export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}`

export default function CodeViewerDocsDemo() {
  return (
    <div className="w-full p-4">
      <CodeViewer code={CODE} lang="typescript" title="utils.ts" showLineNumbers />
    </div>
  )
}
