import MonacoEditor, { type Monaco } from '@monaco-editor/react'
import { Suspense } from 'react'
import { cn } from '@/lib/utils'
import { editorPaneClassName, editorPaneLoadingClassName } from './classes'
import { getEditorPath, getMonacoLanguage } from './language'
import { fallbackMonacoTheme } from './monaco'
import type { MonacoEditorInstance } from './types'

interface EditorPaneProps {
  value: string
  language: string
  theme: 'light' | 'dark'
  disabled?: boolean
  split?: boolean
  onMount: (editor: MonacoEditorInstance, monaco: Monaco) => void
  onChange: (value: string) => void
}

export function EditorPane({
  value,
  language,
  theme,
  disabled,
  split,
  onMount,
  onChange,
}: EditorPaneProps) {
  return (
    <div className={cn(editorPaneClassName, split ? 'w-1/2' : 'w-full')}>
      <Suspense fallback={<div className={editorPaneLoadingClassName} />}>
        <MonacoEditor
          height="100%"
          language={getMonacoLanguage(language)}
          path={getEditorPath(language)}
          value={value}
          theme={fallbackMonacoTheme(theme)}
          onMount={onMount}
          onChange={(nextValue) => onChange(nextValue ?? '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
              useShadows: false,
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            },
            automaticLayout: true,
            readOnly: disabled,
            domReadOnly: disabled,
            padding: { top: 8, bottom: 8 },
          }}
        />
      </Suspense>
    </div>
  )
}
