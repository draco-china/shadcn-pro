import { DiffViewer } from "@/registry/new-york-v4/pro/pro-viewer/diff"

const OLD_CODE = `function total(items) {
  return items.length
}`

const NEW_CODE = `function total(items: unknown[]) {
  return items.length
}`

export default function DiffViewerDocsDemo() {
  return (
    <div className="w-full p-4">
      <DiffViewer
        oldCode={OLD_CODE}
        newCode={NEW_CODE}
        oldTitle="before.ts"
        newTitle="after.ts"
      />
    </div>
  )
}
