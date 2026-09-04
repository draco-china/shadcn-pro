'use client'

import type { Monaco, EditorProps as MonacoReactEditorProps } from '@monaco-editor/react'
import { Columns2, Copy, Eye, EyeOff, Maximize2, Minimize2, WandSparkles } from 'lucide-react'
import type { editor } from 'monaco-editor'
import {
  type ComponentType,
  type ReactNode,
  type Ref,
  Suspense,
  type UIEvent,
  type UIEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { cn } from '@/lib/utils'
import { CopyButton, ProButton, type ProButtonSize } from '../base/button'
import { useFullscreen } from '../base/hooks/use-fullscreen'
import { applyShadcnTheme, configureMonaco } from './theme'

type EditorTheme = 'light' | 'dark'
type MonacoEditorInstance = editor.IStandaloneCodeEditor
type EditorViewMode = 'edit' | 'preview' | 'split'
type EditorFullscreenMode = 'fixed' | 'screen'

type EditorToolbarSlot = ReactNode | ((context: EditorToolbarActionContext) => ReactNode)

interface EditorToolbarActionContext {
  value: string
  disabled: boolean
  language: string
  theme: EditorTheme
  size?: ProButtonSize
  mode: EditorViewMode
  hasPreview: boolean
  isSplitView: boolean
  fullscreen: boolean
  fullscreenMode: EditorFullscreenMode
  editor: MonacoEditorInstance | null
  format: () => void
  setMode: (mode: EditorViewMode) => void
  setFullscreen: (fullscreen: boolean) => void
}

interface EditorProps {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  language?: string
  theme?: EditorTheme
  className?: string
  height?: string | number
  size?: ProButtonSize
  /** Monaco `vs` CDN path. */
  monacoCdnBaseUrl?: string
  /** ESM CDN base URL used by the Shiki syntax/theme Worker. */
  shikiCdnBaseUrl?: string
  toolbar?: false | EditorToolbarSlot
  toolbarTitle?: EditorToolbarSlot
  toolbarMode?: boolean
  toolbarFormat?: boolean
  toolbarCopy?: boolean
  fullscreen?:
    | false
    | {
        value?: boolean
        defaultValue?: boolean
        onChange?: (fullscreen: boolean) => void
        mode?: EditorFullscreenMode
      }
  preview?: {
    component: ComponentType<{
      content: string
      language: string
      scrollContainerRef?: Ref<HTMLDivElement>
      onScroll?: UIEventHandler<HTMLDivElement>
    }>
    mode?: EditorViewMode
    defaultMode?: EditorViewMode
    onModeChange?: (mode: EditorViewMode) => void
  }
}

function useEditorState({
  value,
  onChange,
  disabled,
  language = 'plaintext',
  theme,
  size,
  height,
  fullscreen,
  preview,
  shikiCdnBaseUrl,
}: Pick<
  EditorProps,
  | 'value'
  | 'onChange'
  | 'disabled'
  | 'language'
  | 'theme'
  | 'size'
  | 'height'
  | 'fullscreen'
  | 'preview'
  | 'shikiCdnBaseUrl'
>) {
  const [localValue, setLocalValue] = useState(value ?? '')
  const [uncontrolledMode, setUncontrolledMode] = useState<EditorViewMode>(
    preview?.defaultMode ?? 'split',
  )
  const PreviewComponent = preview?.component
  const hasPreview = !!PreviewComponent
  const controlledMode = preview?.mode
  const onPreviewModeChange = preview?.onModeChange
  const effectiveMode: EditorViewMode = hasPreview ? (controlledMode ?? uncontrolledMode) : 'edit'
  const showEditorPane = effectiveMode !== 'preview'
  const showPreviewPane = hasPreview && effectiveMode !== 'edit'
  const isSplitView = showEditorPane && showPreviewPane
  const fullscreenOption = typeof fullscreen === 'object' ? fullscreen : undefined
  const fullscreenMode = fullscreenOption?.mode ?? 'fixed'
  const fullscreenState = useFullscreen({
    fullscreen: fullscreenOption?.value,
    defaultFullscreen: fullscreenOption?.defaultValue,
    onFullscreenChange: fullscreenOption?.onChange,
    mode: fullscreenMode,
  })
  const isFixedFullscreen = fullscreenState.fullscreen && fullscreenMode === 'fixed'
  const isScreenFullscreen = fullscreenState.fullscreen && fullscreenMode === 'screen'
  const previewScroll = useEditorPreviewScrollSync()
  const monacoEditor = useMonacoEditor({ disabled, theme, previewScroll, shikiCdnBaseUrl })
  const hasExplicitHeight = height !== undefined
  const contentHeight = typeof height === 'number' ? `${height}px` : height
  const contentStyle =
    hasExplicitHeight && !fullscreenState.fullscreen ? { height: contentHeight } : undefined
  const rootStyle = isFixedFullscreen && hasExplicitHeight ? { height: contentHeight } : undefined

  useEffect(() => {
    setLocalValue(value ?? '')
  }, [value])

  const handleChange = useCallback(
    (nextValue: string) => {
      if (disabled) return
      setLocalValue(nextValue)
      onChange?.(nextValue)
    },
    [disabled, onChange],
  )

  const setMode = useCallback(
    (nextMode: EditorViewMode) => {
      const next = hasPreview ? nextMode : 'edit'
      if (controlledMode === undefined) setUncontrolledMode(next)
      onPreviewModeChange?.(next)
    },
    [controlledMode, hasPreview, onPreviewModeChange],
  )

  useEffect(() => {
    previewScroll.setSyncEnabled(isSplitView)
  }, [isSplitView, previewScroll.setSyncEnabled])

  const toolbarContext: EditorToolbarActionContext = {
    value: localValue,
    disabled: disabled ?? false,
    language,
    theme: theme ?? 'dark',
    size,
    mode: effectiveMode,
    hasPreview,
    isSplitView,
    fullscreen: fullscreenState.fullscreen,
    fullscreenMode,
    editor: monacoEditor.editorRef.current,
    format: monacoEditor.handleFormat,
    setMode,
    setFullscreen: fullscreenState.setFullscreen,
  }

  return {
    localValue,
    rootRef: fullscreenState.ref,
    fullscreen: fullscreenState.fullscreen,
    isFixedFullscreen,
    isScreenFullscreen,
    setFullscreen: fullscreenState.setFullscreen,
    contentStyle,
    contentFillsParent: fullscreenState.fullscreen || !hasExplicitHeight,
    rootStyle,
    PreviewComponent,
    hasPreview,
    effectiveMode,
    showEditorPane,
    showPreviewPane,
    isSplitView,
    toolbarContext,
    editorRef: monacoEditor.editorRef,
    previewScroll,
    handleChange,
    handleMount: monacoEditor.handleMount,
    handleFormat: monacoEditor.handleFormat,
    setMode,
  }
}

function useMonacoEditor({
  disabled,
  theme,
  previewScroll,
  shikiCdnBaseUrl,
}: {
  disabled?: boolean
  theme?: EditorTheme
  previewScroll: ReturnType<typeof useEditorPreviewScrollSync>
  shikiCdnBaseUrl?: string
}) {
  const themeRef = useRef(theme ?? 'dark')
  const editorRef = useRef<MonacoEditorInstance | null>(null)
  const monacoRef = useRef<Monaco | null>(null)
  const { scrollDisposableRef, syncPreviewFromEditor } = previewScroll

  useEffect(() => {
    themeRef.current = theme ?? 'dark'
  }, [theme])

  const handleMount = useCallback(
    (editor: MonacoEditorInstance, monaco: Monaco) => {
      editorRef.current = editor
      monacoRef.current = monaco
      scrollDisposableRef.current?.dispose()
      scrollDisposableRef.current = editor.onDidScrollChange(() => syncPreviewFromEditor(editor))
      configureMonaco(monaco, {
        cdnBaseUrl: shikiCdnBaseUrl,
        getTheme: () => themeRef.current,
      })
      applyShadcnTheme(monaco, themeRef.current, shikiCdnBaseUrl).catch(() => {})
    },
    [scrollDisposableRef, shikiCdnBaseUrl, syncPreviewFromEditor],
  )

  useEffect(() => {
    const monaco = monacoRef.current
    if (monaco) applyShadcnTheme(monaco, theme ?? 'dark', shikiCdnBaseUrl).catch(() => {})
  }, [shikiCdnBaseUrl, theme])

  const handleFormat = useCallback(() => {
    if (disabled) return
    editorRef.current?.getAction('editor.action.formatDocument')?.run()
  }, [disabled])

  return {
    editorRef,
    handleMount,
    handleFormat,
  }
}

function useEditorPreviewScrollSync() {
  const previewPaneRef = useRef<HTMLDivElement | null>(null)
  const previewScrollElementRef = useRef<HTMLDivElement | null>(null)
  const scrollDisposableRef = useRef<{ dispose: () => void } | null>(null)
  const syncSourceRef = useRef<'editor' | 'preview' | null>(null)
  const syncEnabledRef = useRef(false)

  const setPreviewScrollElement = useCallback((node: HTMLDivElement | null) => {
    previewScrollElementRef.current = node
  }, [])

  const releaseSyncLock = useCallback(() => {
    window.requestAnimationFrame(() => {
      syncSourceRef.current = null
    })
  }, [])

  const syncPreviewFromEditor = useCallback(
    (editor: MonacoEditorInstance) => {
      if (!syncEnabledRef.current || syncSourceRef.current === 'preview') return
      const previewElement = previewScrollElementRef.current ?? previewPaneRef.current
      if (!previewElement) return

      const editorMaxScrollTop = Math.max(
        editor.getScrollHeight() - editor.getLayoutInfo().height,
        0,
      )
      const previewMaxScrollTop = Math.max(
        previewElement.scrollHeight - previewElement.clientHeight,
        0,
      )
      if (editorMaxScrollTop <= 0 || previewMaxScrollTop <= 0) return

      syncSourceRef.current = 'editor'
      previewElement.scrollTop = (editor.getScrollTop() / editorMaxScrollTop) * previewMaxScrollTop
      releaseSyncLock()
    },
    [releaseSyncLock],
  )

  const handlePreviewScroll = useCallback(
    (event: UIEvent<HTMLDivElement>, editor: MonacoEditorInstance | null) => {
      if (!syncEnabledRef.current || syncSourceRef.current === 'editor' || !editor) return

      const previewElement = event.currentTarget
      const previewMaxScrollTop = Math.max(
        previewElement.scrollHeight - previewElement.clientHeight,
        0,
      )
      const editorMaxScrollTop = Math.max(
        editor.getScrollHeight() - editor.getLayoutInfo().height,
        0,
      )
      if (previewMaxScrollTop <= 0 || editorMaxScrollTop <= 0) return

      syncSourceRef.current = 'preview'
      editor.setScrollTop((previewElement.scrollTop / previewMaxScrollTop) * editorMaxScrollTop)
      releaseSyncLock()
    },
    [releaseSyncLock],
  )

  const setSyncEnabled = useCallback((enabled: boolean) => {
    syncEnabledRef.current = enabled
  }, [])

  useEffect(() => () => scrollDisposableRef.current?.dispose(), [])

  return {
    previewPaneRef,
    scrollDisposableRef,
    setPreviewScrollElement,
    syncPreviewFromEditor,
    handlePreviewScroll,
    setSyncEnabled,
  }
}

/** Monaco editor with preview, formatting, scroll sync, and fullscreen modes. */
export function ProEditor({
  value,
  onChange,
  disabled = false,
  language = 'plaintext',
  theme = 'dark',
  className,
  height,
  size = 'icon',
  toolbar,
  toolbarTitle,
  toolbarMode = true,
  toolbarFormat = true,
  toolbarCopy = true,
  fullscreen,
  preview,
  monacoCdnBaseUrl = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs',
  shikiCdnBaseUrl,
}: EditorProps) {
  const editor = useEditorState({
    value,
    onChange,
    disabled,
    language,
    theme,
    size,
    height,
    fullscreen,
    preview,
    shikiCdnBaseUrl,
  })
  const MonacoEditor = useMonacoEditorComponent(editor.showEditorPane, monacoCdnBaseUrl)
  const PreviewComponent = editor.PreviewComponent
  const defaultToolbarTitle =
    {
      css: 'CSS',
      go: 'Go',
      html: 'HTML',
      java: 'Java',
      javascript: 'JavaScript',
      json: 'JSON',
      markdown: 'Markdown',
      python: 'Python',
      rust: 'Rust',
      shell: 'Shell',
      sql: 'SQL',
      tsx: 'TSX',
      typescript: 'TypeScript',
      yaml: 'YAML',
    }[language] || language
  const previewModeActive = editor.effectiveMode === 'preview'

  return (
    <div
      ref={editor.rootRef}
      className={cn(
        'min-h-0',
        editor.contentFillsParent && 'h-full',
        editor.isScreenFullscreen && 'bg-background',
        className,
      )}
      style={editor.rootStyle}
    >
      <div
        className={cn(
          'rounded-md border border-input overflow-hidden flex flex-col',
          editor.contentFillsParent && 'h-full min-h-0',
          editor.isFixedFullscreen && 'fixed inset-0 z-50 h-full rounded-none border-0',
          editor.isScreenFullscreen && 'h-screen rounded-none border-0',
        )}
      >
        {toolbar !== false && (
          <div
            className={
              'flex min-h-9 w-full flex-col gap-1 border-b border-input bg-background px-2 py-1 md:flex-row md:items-center md:justify-between'
            }
          >
            <span className="px-3 text-sm font-medium text-foreground capitalize">
              {typeof toolbarTitle === 'function'
                ? (toolbarTitle(editor.toolbarContext) ?? defaultToolbarTitle)
                : (toolbarTitle ?? defaultToolbarTitle)}
            </span>
            <div className="flex flex-wrap items-center justify-end gap-1 md:ml-auto md:shrink-0">
              {typeof toolbar === 'function' ? toolbar(editor.toolbarContext) : toolbar}
              {editor.hasPreview && toolbarMode && (
                <>
                  <ProButton
                    size={size}
                    variant={previewModeActive ? 'secondary' : 'ghost'}
                    tooltip={previewModeActive ? 'Hide Preview' : 'Preview'}
                    onClick={() => editor.setMode(previewModeActive ? 'edit' : 'preview')}
                  >
                    {previewModeActive ? <EyeOff /> : <Eye />}
                  </ProButton>
                  <ProButton
                    size={size}
                    variant={editor.isSplitView ? 'secondary' : 'ghost'}
                    tooltip="Split View"
                    onClick={() =>
                      editor.setMode(editor.effectiveMode === 'split' ? 'edit' : 'split')
                    }
                  >
                    <Columns2 />
                  </ProButton>
                </>
              )}
              {toolbarFormat && (
                <ProButton
                  size={size}
                  variant="ghost"
                  tooltip="Format"
                  disabled={disabled}
                  onClick={editor.handleFormat}
                >
                  <WandSparkles />
                </ProButton>
              )}
              {toolbarCopy && (
                <CopyButton
                  size={size}
                  variant="ghost"
                  icon={<Copy />}
                  tooltip="Copy"
                  disabled={disabled}
                  copy={editor.toolbarContext.value}
                />
              )}
              {fullscreen !== false && (
                <ProButton
                  size={size}
                  variant="ghost"
                  tooltip={editor.fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                  onClick={() => editor.setFullscreen(!editor.fullscreen)}
                >
                  {editor.fullscreen ? <Minimize2 /> : <Maximize2 />}
                </ProButton>
              )}
            </div>
          </div>
        )}
        <div
          className={cn(
            'flex min-h-0',
            editor.contentFillsParent && 'flex-1',
            editor.isSplitView && 'divide-x divide-input',
          )}
          style={editor.contentStyle}
        >
          {editor.showEditorPane && (
            <div className={cn('flex-1 min-w-0', editor.isSplitView ? 'w-1/2' : 'w-full')}>
              {MonacoEditor ? (
                <MonacoEditor
                  height="100%"
                  language={language === 'tsx' ? 'typescript' : language}
                  path={getEditorPath(language)}
                  value={editor.localValue}
                  theme={theme === 'dark' ? 'one-dark-pro' : 'one-light'}
                  onMount={editor.handleMount}
                  onChange={(nextValue) => editor.handleChange(nextValue ?? '')}
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
                    'semanticHighlighting.enabled': true,
                    readOnly: disabled,
                    domReadOnly: disabled,
                    padding: { top: 8, bottom: 8 },
                  }}
                />
              ) : (
                <div
                  className="size-full animate-pulse bg-muted"
                  role="status"
                  aria-label="Loading editor"
                />
              )}
            </div>
          )}

          {editor.showPreviewPane && PreviewComponent && (
            <div
              ref={editor.previewScroll.previewPaneRef}
              onScroll={(event) =>
                editor.previewScroll.handlePreviewScroll(event, editor.editorRef.current)
              }
              className={cn(
                'h-full overflow-auto bg-background [scrollbar-width:thin] [scrollbar-color:transparent_transparent] hover:[scrollbar-color:rgba(148,163,184,0.45)_transparent] [&::-webkit-scrollbar]:size-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/35',
                editor.isSplitView ? 'w-1/2' : 'w-full',
              )}
            >
              <Suspense
                fallback={
                  <div className="p-4 text-sm text-muted-foreground animate-pulse">
                    Loading preview...
                  </div>
                }
              >
                <PreviewComponent
                  content={editor.localValue}
                  language={language}
                  scrollContainerRef={editor.previewScroll.setPreviewScrollElement}
                  onScroll={(event) =>
                    editor.previewScroll.handlePreviewScroll(event, editor.editorRef.current)
                  }
                />
              </Suspense>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function useMonacoEditorComponent(enabled: boolean, cdnBaseUrl: string) {
  const [component, setComponent] = useState<ComponentType<MonacoReactEditorProps> | null>(null)

  useEffect(() => {
    let active = true
    if (!enabled) return

    void import('@monaco-editor/react').then(({ default: MonacoComponent, loader }) => {
      loader.config({ paths: { vs: cdnBaseUrl.replace(/\/+$/, '') } })
      if (active) setComponent(() => MonacoComponent)
    })

    return () => {
      active = false
    }
  }, [cdnBaseUrl, enabled])

  return component
}

function getEditorPath(language: string) {
  if (language === 'tsx') return 'file:///index.tsx'
  if (language === 'typescript') return 'file:///index.ts'
  if (language === 'javascript') return 'file:///index.jsx'
  return `file:///index.${language}`
}
