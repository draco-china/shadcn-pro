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
import type {
  EditorProps,
  EditorToolbarAction,
  EditorToolbarActionContent,
  EditorToolbarActionContext,
  EditorViewMode,
  MonacoEditorInstance,
} from './types'

export type {
  EditorPreviewOptions,
  EditorProps,
  EditorToolbarAction,
  EditorToolbarActionContext,
  EditorToolbarOptions,
  EditorViewMode,
  PreviewProps,
} from './types'

export function ProEditor({
  value = '',
  onChange,
  language,
  theme = 'dark',
  className,
  height,
  toolbar,
  preview,
}: EditorProps) {
  const [localValue, setLocalValue] = React.useState(value)
  const [copied, setCopied] = React.useState(false)
  const [fullscreen, setFullscreen] = React.useState(false)
  const defaultMode = preview?.defaultMode ?? 'split'
  const [uncontrolledMode, setUncontrolledMode] = React.useState<EditorViewMode>(defaultMode)
  const themeRef = React.useRef(theme)
  React.useEffect(() => {
    themeRef.current = theme
  }, [theme])
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
      void applyShadcnTheme(monaco, themeRef.current)
    },
    [syncPreviewFromEditor],
  )

  React.useEffect(() => {
    const monaco = monacoRef.current
    if (monaco) void applyShadcnTheme(monaco, theme)
  }, [theme])

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
  const rootStyle = fullscreen && hasExplicitHeight ? { height: contentHeight } : undefined

  const PreviewComponent = preview?.component ?? null
  const hasPreview = PreviewComponent !== null
  const controlledMode = preview?.mode
  const mode = controlledMode ?? uncontrolledMode
  const effectiveMode = hasPreview ? mode : 'edit'
  const showEditorPane = effectiveMode !== 'preview'
  const showPreviewPane = hasPreview && effectiveMode !== 'edit'
  const isSplitView = showEditorPane && showPreviewPane

  const setMode = React.useCallback(
    (nextMode: EditorViewMode) => {
      const next = hasPreview ? nextMode : 'edit'
      if (controlledMode === undefined) setUncontrolledMode(next)
      preview?.onModeChange?.(next)
    },
    [controlledMode, hasPreview, preview],
  )

  React.useEffect(() => {
    setSyncEnabled(isSplitView)
  }, [isSplitView, setSyncEnabled])

  const toolbarContext: EditorToolbarActionContext = {
    value: localValue,
    language,
    theme,
    mode: effectiveMode,
    hasPreview,
    isSplitView,
    copied,
    fullscreen,
    editor: editorRef.current,
    format: handleFormat,
    copy: handleCopy,
    setMode,
    setFullscreen,
  }
  const toolbarOptions = toolbar === false ? undefined : toolbar
  const toolbarBuiltInOptions = toolbarOptions?.options
  const showBuiltInToolbarOptions = toolbarBuiltInOptions !== false
  const startToolbarActionNodes = renderToolbarActions(
    toolbarOptions?.actions,
    toolbarContext,
    'start',
  )
  const toolbarActionNodes = renderToolbarActions(toolbarOptions?.actions, toolbarContext, 'before')
  const afterToolbarActionNodes = renderToolbarActions(
    toolbarOptions?.actions,
    toolbarContext,
    'after',
  )

  return (
    <div
      className={cn('min-h-0', (!hasExplicitHeight || fullscreen) && 'h-full', className)}
      style={rootStyle}
    >
      <div
        className={cn(
          'rounded-md border border-input overflow-hidden flex flex-col',
          contentFillsParent && 'h-full min-h-0',
          fullscreen && 'fixed inset-0 z-50 h-full rounded-none border-0',
        )}
      >
        {toolbar !== false && (
          <EditorToolbar
            language={language}
            copied={copied}
            fullscreen={fullscreen}
            startActions={startToolbarActionNodes}
            actions={toolbarActionNodes}
            afterActions={afterToolbarActionNodes}
            format={showBuiltInToolbarOptions && (toolbarBuiltInOptions?.format ?? true)}
            copy={showBuiltInToolbarOptions && (toolbarBuiltInOptions?.copy ?? true)}
            fullscreenControl={
              showBuiltInToolbarOptions && (toolbarBuiltInOptions?.fullscreen ?? true)
            }
            onFormat={handleFormat}
            onCopy={handleCopy}
            onFullscreenChange={setFullscreen}
          >
            {hasPreview && showBuiltInToolbarOptions && (toolbarBuiltInOptions?.mode ?? true) && (
              <>
                <EditorToolbarButton
                  active={effectiveMode === 'preview'}
                  label={effectiveMode === 'preview' ? 'Hide preview' : 'Show preview'}
                  tooltip={effectiveMode === 'preview' ? 'Hide Preview' : 'Preview'}
                  onClick={() => setMode(effectiveMode === 'preview' ? 'edit' : 'preview')}
                >
                  {effectiveMode === 'preview' ? <EyeOff size={14} /> : <Eye size={14} />}
                </EditorToolbarButton>
                <EditorToolbarButton
                  active={isSplitView}
                  label="Split view"
                  tooltip="Split View"
                  onClick={() => setMode(effectiveMode === 'split' ? 'edit' : 'split')}
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
                  theme={fallbackMonacoTheme(theme)}
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

function renderToolbarActions(
  actions: EditorToolbarAction[] | undefined,
  context: EditorToolbarActionContext,
  position: NonNullable<EditorToolbarAction['position']>,
) {
  return (actions ?? [])
    .filter((action) => (action.position ?? 'before') === position)
    .filter((action) => !resolveToolbarActionState(action.hidden, context))
    .map((action) => {
      const {
        key,
        label,
        icon,
        tooltip,
        position,
        disabled,
        hidden,
        onClick,
        className,
        ...buttonProps
      } = action
      void position
      void hidden

      const iconContent = resolveToolbarActionContent(icon, context)

      return (
        <EditorToolbarButton
          key={key}
          label={label}
          tooltip={tooltip ?? label}
          disabled={resolveToolbarActionState(disabled, context)}
          className={cn(!iconContent && 'w-auto px-2', className)}
          onClick={() => onClick?.(context)}
          {...buttonProps}
        >
          {iconContent ?? label}
        </EditorToolbarButton>
      )
    })
}

function resolveToolbarActionState(
  value: boolean | ((context: EditorToolbarActionContext) => boolean) | undefined,
  context: EditorToolbarActionContext,
) {
  return typeof value === 'function' ? value(context) : Boolean(value)
}

function resolveToolbarActionContent(
  value: EditorToolbarActionContent | undefined,
  context: EditorToolbarActionContext,
) {
  return typeof value === 'function' ? value(context) : value
}
