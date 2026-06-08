"use client"

import { type ComponentProps, useState } from 'react'
import { useTheme } from 'next-themes'
import { Focus, RotateCcw } from 'lucide-react'
import { ProButton } from "@/registry/new-york-v4/pro/base/button"
import { ProEditor } from "@/registry/new-york-v4/pro/editor"

type ViewMode = NonNullable<NonNullable<ComponentProps<typeof ProEditor>["preview"]>["mode"]>
type PreviewProps = Parameters<
  NonNullable<NonNullable<ComponentProps<typeof ProEditor>["preview"]>["component"]>
>[0]

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

const VIEW_MODE_OPTIONS: { label: string; value: ViewMode }[] = [
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
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme === 'light' ? 'light' : 'dark'
  const [mode, setMode] = useState<ViewMode>("split")

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
          value={mode}
          onChange={(event) => setMode(event.target.value as ViewMode)}
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
        toolbarTitle={({ language }) => (
          <span className="flex items-center gap-2">
            <span>Example editor</span>
            <span className="text-muted-foreground uppercase">{language}</span>
          </span>
        )}
        toolbar={({ editor }) => (
          <>
            <ProButton
              tooltip="Focus editor"
              size="icon-xs"
              variant="ghost"
              onClick={() => editor?.focus()}
            >
              <Focus size={14} />
            </ProButton>
            <ProButton onClick={() => setValue(INITIAL_CODE)}>
              <RotateCcw size={14} />
              Reset
            </ProButton>
          </>
        )}
        preview={{
          component: PlainPreview,
          mode,
          onModeChange: setMode,
        }}
        height={380}
      />
    </div>
  )
}
