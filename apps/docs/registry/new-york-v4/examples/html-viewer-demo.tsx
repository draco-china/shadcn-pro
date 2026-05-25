'use client'

import { HtmlViewer } from '@/registry/new-york-v4/pro/pro-viewer/html'

const DEMO_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: sans-serif; padding: 24px; margin: 0; background: #fff; color: #111; }
    h1 { font-size: 1.5rem; margin-bottom: 8px; }
    p { color: #555; line-height: 1.6; }
    button { margin-top: 12px; padding: 8px 16px; background: #111; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
    button:hover { background: #333; }
  </style>
</head>
<body>
  <h1>Hello from HtmlViewer</h1>
  <p>This HTML is rendered in a sandboxed iframe. Scripts are isolated from the host page.</p>
  <button onclick="alert('Hello!')">Click me</button>
</body>
</html>`

export default function HtmlViewerDemo() {
  return <HtmlViewer content={DEMO_HTML} className="h-64 w-full rounded-lg border" />
}
