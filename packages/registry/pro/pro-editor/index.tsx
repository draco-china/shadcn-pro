'use client'

import MonacoEditor, { type Monaco } from '@monaco-editor/react'
import { Columns2, Eye, EyeOff } from 'lucide-react'
import * as React from 'react'
import { useProFullscreen } from '@/components/pro/pro-base'
import type { ProToolbarItem } from '@/components/pro/pro-toolbar'
import { cn } from '@/lib/utils'
import { getEditorPath, getMonacoLanguage } from './language'
import { applyShadcnTheme, configureTypescript, fallbackMonacoTheme } from './monaco'
import { useEditorPreviewScrollSync } from './preview/scroll-sync'
import { scrollbarClassName } from './preview/styles'
import { EditorToolbar } from './toolbar'
import type {
  EditorProps,
  EditorToolbarAction,
  EditorToolbarActionContext,
  EditorToolbarOptions,
  EditorViewMode,
  MonacoEditorInstance,
} from './types'

export type {
  EditorFullscreenMode,
  EditorPreviewOptions,
  EditorProps,
  EditorToolbarAction,
  EditorToolbarActionContext,
  EditorToolbarFullscreenOptions,
  EditorToolbarOptions,
  EditorViewMode,
  PreviewProps,
} from './types'

export function ProEditor({
  value = '',
  onChange,
  disabled = false,
  language,
  theme = 'dark',
  className,
  height,
  toolbar,
  preview,
}: EditorProps) {
  const [localValue, setLocalValue] = React.useState(value)
  const toolbarOptions = toolbar === false ? undefined : toolbar
  const toolbarBuiltInOptions = toolbarOptions?.options
  const showBuiltInToolbarOptions = toolbarBuiltInOptions !== false
  const fullscreenOption =
    toolbarBuiltInOptions && typeof toolbarBuiltInOptions.fullscreen === 'object'
      ? toolbarBuiltInOptions.fullscreen
      : undefined
  const fullscreenMode = fullscreenOption?.mode ?? 'fixed'
  const {
    ref: rootRef,
    fullscreen,
    isFixedFullscreen,
    isScreenFullscreen,
    setFullscreen,
  } = useProFullscreen<HTMLDivElement>({
    fullscreen: fullscreenOption?.value,
    defaultFullscreen: fullscreenOption?.defaultValue,
    onFullscreenChange: fullscreenOption?.onChange,
    mode: fullscreenMode,
  })
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
    if (disabled) return
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

  const handleFormat = () => {
    if (disabled) return
    editorRef.current?.getAction('editor.action.formatDocument')?.run()
  }

  const hasExplicitHeight = height !== undefined
  const contentHeight =
    typeof height === 'number' ? `${height}px` : hasExplicitHeight ? height : undefined
  const contentStyle = hasExplicitHeight && !fullscreen ? { height: contentHeight } : undefined
  const contentFillsParent = fullscreen || !hasExplicitHeight
  const rootStyle = isFixedFullscreen && hasExplicitHeight ? { height: contentHeight } : undefined

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
    disabled,
    language,
    theme,
    mode: effectiveMode,
    hasPreview,
    isSplitView,
    fullscreen,
    fullscreenMode,
    editor: editorRef.current,
    format: handleFormat,
    setMode,
    setFullscreen,
  }
  const toolbarActions = getToolbarActions(toolbarOptions?.actions, 'before')
  const afterToolbarActions = getToolbarActions(toolbarOptions?.actions, 'after')
  const centerToolbarActions: ProToolbarItem<EditorToolbarActionContext>[] =
    hasPreview && showBuiltInToolbarOptions && (toolbarBuiltInOptions?.mode ?? true)
      ? [
          {
            key: 'preview',
            icon: effectiveMode === 'preview' ? <EyeOff size={14} /> : <Eye size={14} />,
            tooltip: effectiveMode === 'preview' ? 'Hide Preview' : 'Preview',
            'aria-label': effectiveMode === 'preview' ? 'Hide preview' : 'Show preview',
            variant: effectiveMode === 'preview' ? 'secondary' : 'ghost',
            size: 'icon-xs',
            onClick: () => setMode(effectiveMode === 'preview' ? 'edit' : 'preview'),
          },
          {
            key: 'split',
            icon: <Columns2 size={14} />,
            tooltip: 'Split View',
            'aria-label': 'Split view',
            variant: isSplitView ? 'secondary' : 'ghost',
            size: 'icon-xs',
            onClick: () => setMode(effectiveMode === 'split' ? 'edit' : 'split'),
          },
        ]
      : []

  return (
    <div
      ref={rootRef}
      className={cn(
        'min-h-0',
        (!hasExplicitHeight || fullscreen) && 'h-full',
        isScreenFullscreen && 'bg-background',
        className,
      )}
      style={rootStyle}
    >
      <div
        className={cn(
          'rounded-md border border-input overflow-hidden flex flex-col',
          contentFillsParent && 'h-full min-h-0',
          isFixedFullscreen && 'fixed inset-0 z-50 h-full rounded-none border-0',
          isScreenFullscreen && 'h-screen rounded-none border-0',
        )}
      >
        {toolbar !== false && (
          <EditorToolbar
            language={language}
            fullscreen={fullscreen}
            context={toolbarContext}
            title={toolbarOptions?.title}
            centerActions={centerToolbarActions}
            actions={toolbarActions}
            afterActions={afterToolbarActions}
            format={showBuiltInToolbarOptions && (toolbarBuiltInOptions?.format ?? true)}
            copy={showBuiltInToolbarOptions && (toolbarBuiltInOptions?.copy ?? true)}
            fullscreenControl={
              showBuiltInToolbarOptions &&
              isFullscreenControlEnabled(toolbarBuiltInOptions?.fullscreen)
            }
            onFormat={handleFormat}
            onFullscreenChange={(nextFullscreen) => setFullscreen(nextFullscreen)}
          />
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
                    readOnly: disabled,
                    domReadOnly: disabled,
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

function isFullscreenControlEnabled(fullscreen: EditorToolbarFullscreenOption | undefined) {
  if (fullscreen === false) return false
  if (fullscreen && typeof fullscreen === 'object') return fullscreen.enabled ?? true
  return true
}

type EditorToolbarFullscreenOption =
  | boolean
  | NonNullable<Exclude<EditorToolbarOptions['options'], false>>['fullscreen']

function getToolbarActions(
  actions: EditorToolbarAction[] | undefined,
  position: NonNullable<EditorToolbarAction['position']>,
) {
  return (actions ?? [])
    .filter((action) => (action.position ?? 'before') === position)
    .map((action) => {
      const { position: _position, ...item } = action
      void _position
      return item
    })
}
