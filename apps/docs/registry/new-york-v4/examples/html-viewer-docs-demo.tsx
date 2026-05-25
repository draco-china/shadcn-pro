import { HtmlViewer } from "@/registry/new-york-v4/pro/pro-viewer/html"

const HTML = `<!doctype html>
<html>
  <body style="font-family: sans-serif; padding: 24px;">
    <h1 style="margin: 0 0 8px;">HTML preview</h1>
    <p style="color: #555;">Sandboxed iframe rendering for trusted snippets.</p>
  </body>
</html>`

export default function HtmlViewerDocsDemo() {
  return (
    <div className="w-full p-4">
      <HtmlViewer content={HTML} className="h-56 rounded-lg border" />
    </div>
  )
}
