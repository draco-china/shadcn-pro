"use client"

import { useState } from "react"
import { ProEditor } from "@/registry/new-york-v4/pro/pro-editor/index"
import type {
  EditorTheme,
  EditorViewMode,
  PreviewProps,
} from "@/registry/new-york-v4/pro/pro-editor/index"

const INITIAL_CODE = `import { useState } from "react"

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
      {expanded && <p className="text-sm text-muted-foreground">{user.email}</p>}
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? "Collapse" : "Expand"}
      </button>
    </div>
  )
}
`

const LANGUAGE_OPTIONS = [
  { label: "TSX", value: "tsx" },
  { label: "TypeScript", value: "typescript" },
  { label: "Markdown", value: "markdown" },
  { label: "JSON", value: "json" },
]

const THEME_OPTIONS: { label: string; value: EditorTheme }[] = [
  { label: "One Dark Pro", value: "one-dark-pro" },
  { label: "GitHub", value: "github" },
]

const VIEW_MODE_OPTIONS: { label: string; value: EditorViewMode }[] = [
  { label: "Edit", value: "edit" },
  { label: "Preview", value: "preview" },
  { label: "Split", value: "split" },
]

function PlainPreview({ content, language }: PreviewProps) {
  return (
    <pre className="h-full overflow-auto bg-muted/30 p-4 font-mono text-sm whitespace-pre">
      <code data-language={language}>{content}</code>
    </pre>
  )
}

export default function ProEditorDemo() {
  const [value, setValue] = useState(INITIAL_CODE)
  const [language, setLanguage] = useState("tsx")
  const [theme, setTheme] = useState<EditorTheme>("one-dark-pro")
  const [viewMode, setViewMode] = useState<EditorViewMode>("split")

  return (
    <div className="w-full space-y-3 p-4">
      <div className="flex justify-end gap-2">
        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-xs"
          aria-label="Editor language"
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          value={theme}
          onChange={(event) => setTheme(event.target.value as EditorTheme)}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-xs"
          aria-label="Editor theme"
        >
          {THEME_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          value={viewMode}
          onChange={(event) => setViewMode(event.target.value as EditorViewMode)}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-xs"
          aria-label="Editor view mode"
        >
          {VIEW_MODE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <ProEditor
        language={language}
        theme={theme}
        value={value}
        onChange={setValue}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        toolbarBefore={
          <span className="rounded-sm bg-background px-2 py-0.5 text-xs text-muted-foreground">
            Demo
          </span>
        }
        toolbarActions={({ editor }) => (
          <button
            type="button"
            className="h-7 rounded-md px-2 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => editor?.focus()}
          >
            Focus
          </button>
        )}
        toolbarAfter={
          <button
            type="button"
            className="h-7 rounded-md px-2 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => setValue(INITIAL_CODE)}
          >
            Reset
          </button>
        }
        preview={PlainPreview}
        height={380}
      />
    </div>
  )
}
