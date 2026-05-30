'use client'

import MonacoEditor, { type Monaco } from '@monaco-editor/react'
import { Columns2, Eye, EyeOff } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { getEditorPath, getMonacoLanguage } from './language'
import { applyShadcnTheme, configureTypescript, fallbackMonacoTheme } from './monaco'
import { useEditorPreviewScrollSync } from './preview/scroll-sync'
import { scrollbarClassName } from './preview/styles'
import { EditorToolbar, EditorToolbarButton } from './toolbar'
import type { EditorProps, EditorThemeMode, EditorViewMode, MonacoEditorInstance } from './types'

export type {
  EditorProps,
  EditorToolbarActionContext,
  EditorViewMode,
  PreviewProps,
} from './types'

export function ProEditor({
  value = '',
  onChange,
  language,
  themeMode = 'dark',
  className,
  height,
  showToolbar = true,
  viewMode: controlledViewMode,
  defaultViewMode = 'split',
  onViewModeChange,
  toolbarBefore,
  toolbarActions,
  toolbarAfter,
  preview,
}: EditorProps) {
  const [localValue, setLocalValue] = React.useState(value)
  const [copied, setCopied] = React.useState(false)
  const [fullscreen, setFullscreen] = React.useState(false)
  const [uncontrolledViewMode, setUncontrolledViewMode] =
    React.useState<EditorViewMode>(defaultViewMode)
  const themeModeRef = React.useRef(themeMode)
  React.useEffect(() => {
    themeModeRef.current = themeMode
  }, [themeMode])
  const editorRef = React.useRef<MonacoEditorInstance | null>(null)
  const monacoRef = React.useRef<Monaco | null>(null)
  const {
    previewPaneRef,
    scrollDisposableRef,
    setPreviewScrollElement,
    syncPreviewFromEditor,
    handlePreviewScroll,
    setSyncEnabled,
  } = useEditorPreviewScrollSync()

  React.useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = (nextValue: string) => {
    setLocalValue(nextValue)
    onChange?.(nextValue)
  }

  const handleMount = React.useCallback(
    (editor: MonacoEditorInstance, monaco: Monaco) => {
      editorRef.current = editor
      monacoRef.current = monaco
      scrollDisposableRef.current?.dispose()
      scrollDisposableRef.current = editor.onDidScrollChange(() => syncPreviewFromEditor(editor))
      configureTypescript(monaco)
      void applyShadcnTheme(monaco, themeModeRef.current)
    },
    [syncPreviewFromEditor],
  )

  React.useEffect(() => {
    const monaco = monacoRef.current
    if (monaco) void applyShadcnTheme(monaco, themeMode)
  }, [themeMode])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(localValue)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFormat = () => {
    editorRef.current?.getAction('editor.action.formatDocument')?.run()
  }

  const hasExplicitHeight = height !== undefined
  const contentHeight =
    typeof height === 'number' ? `${height}px` : hasExplicitHeight ? height : undefined
  const contentStyle = hasExplicitHeight && !fullscreen ? { height: contentHeight } : undefined
  const contentFillsParent = fullscreen || !hasExplicitHeight

  const PreviewComponent = preview ?? null
  const hasPreview = PreviewComponent !== null
  const viewMode = controlledViewMode ?? uncontrolledViewMode
  const effectiveViewMode = hasPreview ? viewMode : 'edit'
  const showEditorPane = effectiveViewMode !== 'preview'
  const showPreviewPane = hasPreview && effectiveViewMode !== 'edit'
  const isSplitView = showEditorPane && showPreviewPane

  const setViewMode = React.useCallback(
    (nextViewMode: EditorViewMode) => {
      const next = hasPreview ? nextViewMode : 'edit'
      if (controlledViewMode === undefined) setUncontrolledViewMode(next)
      onViewModeChange?.(next)
    },
    [controlledViewMode, hasPreview, onViewModeChange],
  )

  React.useEffect(() => {
    setSyncEnabled(isSplitView)
  }, [isSplitView, setSyncEnabled])

  const toolbarContext = {
    value: localValue,
    language,
    themeMode,
    viewMode: effectiveViewMode,
    hasPreview,
    isSplitView,
    copied,
    fullscreen,
    editor: editorRef.current,
    format: handleFormat,
    copy: handleCopy,
    setViewMode,
    setFullscreen,
  }
  const renderToolbarSlot = (
    slot: React.ReactNode | ((context: typeof toolbarContext) => React.ReactNode),
  ) => (typeof slot === 'function' ? slot(toolbarContext) : slot)

  return (
    <div className={cn(fullscreen ? 'contents' : 'h-full min-h-0', className)}>
      <div
        className={cn(
          'rounded-md border border-input overflow-hidden flex flex-col',
          contentFillsParent && 'h-full min-h-0',
          fullscreen && 'fixed inset-0 z-50 h-full rounded-none border-0',
        )}
      >
        {showToolbar && (
          <EditorToolbar
            language={language}
            copied={copied}
            fullscreen={fullscreen}
            before={renderToolbarSlot(toolbarBefore)}
            actions={renderToolbarSlot(toolbarActions)}
            after={renderToolbarSlot(toolbarAfter)}
            onFormat={handleFormat}
            onCopy={handleCopy}
            onFullscreenChange={setFullscreen}
          >
            {hasPreview && (
              <>
                <EditorToolbarButton
                  active={effectiveViewMode === 'preview'}
                  label={effectiveViewMode === 'preview' ? 'Hide preview' : 'Show preview'}
                  tooltip={effectiveViewMode === 'preview' ? 'Hide Preview' : 'Preview'}
                  onClick={() => setViewMode(effectiveViewMode === 'preview' ? 'edit' : 'preview')}
                >
                  {effectiveViewMode === 'preview' ? <EyeOff size={14} /> : <Eye size={14} />}
                </EditorToolbarButton>
                <EditorToolbarButton
                  active={isSplitView}
                  label="Split view"
                  tooltip="Split View"
                  onClick={() => setViewMode(effectiveViewMode === 'split' ? 'edit' : 'split')}
                >
                  <Columns2 size={14} />
                </EditorToolbarButton>
              </>
            )}
          </EditorToolbar>
        )}

        <div
          className={cn(
            'flex min-h-0',
            contentFillsParent && 'flex-1',
            isSplitView && 'divide-x divide-input',
          )}
          style={contentStyle}
        >
          {showEditorPane && (
            <div className={cn('flex-1 min-w-0', isSplitView ? 'w-1/2' : 'w-full')}>
              <React.Suspense fallback={<div className="size-full bg-muted animate-pulse" />}>
                <MonacoEditor
                  height="100%"
                  language={getMonacoLanguage(language)}
                  path={getEditorPath(language)}
                  value={localValue}
                  theme={fallbackMonacoTheme(themeMode)}
                  onMount={handleMount}
                  onChange={(nextValue) => handleChange(nextValue ?? '')}
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
                    padding: { top: 8, bottom: 8 },
                  }}
                />
              </React.Suspense>
            </div>
          )}

          {showPreviewPane && (
            <div
              ref={previewPaneRef}
              onScroll={(event) => handlePreviewScroll(event, editorRef.current)}
              className={cn(
                'overflow-auto bg-background h-full',
                scrollbarClassName,
                isSplitView ? 'w-1/2' : 'w-full',
              )}
            >
              <React.Suspense
                fallback={
                  <div className="p-4 text-sm text-muted-foreground animate-pulse">
                    Loading preview...
                  </div>
                }
              >
                <PreviewComponent
                  content={localValue}
                  language={language}
                  scrollContainerRef={setPreviewScrollElement}
                  onScroll={(event) => handlePreviewScroll(event, editorRef.current)}
                />
              </React.Suspense>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
