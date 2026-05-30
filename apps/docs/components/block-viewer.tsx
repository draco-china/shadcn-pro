'use client'

import {
  Check,
  ChevronRight,
  Clipboard,
  File,
  Folder,
  Fullscreen,
  Monitor,
  RotateCw,
  Smartphone,
  Tablet,
  Terminal,
} from 'lucide-react'
import * as React from 'react'
import type { PanelImperativeHandle } from 'react-resizable-panels'
import { getIconForLanguageExtension } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'

// ---- Types ----

export type BlockFile = {
  path?: string
  target?: string
  content?: string
  highlightedContent?: string
}

export type FileTree = {
  name: string
  path?: string
  children?: FileTree[]
}

export type BlockItem = {
  name: string
  description?: string
  iframeHeight?: string
  iframeSrc?: string
  installName?: string
  installCommand?: string
  files?: BlockFile[]
}

function withBasePath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  return `${basePath}${path}`
}

function getIframeSrc(item: BlockItem) {
  return item.iframeSrc ?? withBasePath(`/view/new-york-v4/${item.name}`)
}

function getInstallCommand(item: BlockItem) {
  return (
    item.installCommand ?? `npx @draco-china/shadcn-pro@latest add ${item.installName ?? item.name}`
  )
}

function getInstallLabel(item: BlockItem) {
  return item.installCommand ?? `npx shadcn-pro add ${item.installName ?? item.name}`
}

function getCodeHeight(height?: string) {
  const value = Number.parseFloat(height ?? '')
  if (!Number.isFinite(value)) return '930px'
  return `${Math.max(value, 600)}px`
}

// ---- Context ----

type BlockViewerContext = {
  item: BlockItem
  view: 'code' | 'preview'
  setView: (view: 'code' | 'preview') => void
  activeFile: string | null
  setActiveFile: (file: string) => void
  resizablePanelRef: React.RefObject<PanelImperativeHandle | null> | null
  tree: FileTree[] | null
  highlightedFiles: BlockFile[] | null
  iframeKey?: number
  setIframeKey?: React.Dispatch<React.SetStateAction<number>>
}

const BlockViewerContext = React.createContext<BlockViewerContext | null>(null)

function useBlockViewer() {
  const context = React.useContext(BlockViewerContext)
  if (!context) {
    throw new Error('useBlockViewer must be used within a BlockViewerProvider.')
  }
  return context
}

function BlockViewerProvider({
  item,
  tree,
  highlightedFiles,
  children,
}: Pick<BlockViewerContext, 'item' | 'tree' | 'highlightedFiles'> & {
  children: React.ReactNode
}) {
  const [view, setView] = React.useState<BlockViewerContext['view']>('preview')
  const [activeFile, setActiveFile] = React.useState<BlockViewerContext['activeFile']>(
    highlightedFiles?.[0]?.target ?? null,
  )
  const resizablePanelRef = React.useRef<PanelImperativeHandle>(null)
  const [iframeKey, setIframeKey] = React.useState(0)

  return (
    <BlockViewerContext.Provider
      value={{
        item,
        view,
        setView,
        resizablePanelRef,
        activeFile,
        setActiveFile,
        tree,
        highlightedFiles,
        iframeKey,
        setIframeKey,
      }}
    >
      <div
        id={item.name}
        data-view={view}
        className="group/block-view-wrapper flex min-w-0 scroll-mt-24 flex-col-reverse items-stretch gap-4 overflow-hidden md:flex-col"
        style={
          {
            '--height': item.iframeHeight ?? '930px',
            '--code-height': getCodeHeight(item.iframeHeight),
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </BlockViewerContext.Provider>
  )
}

// ---- Toolbar ----

function BlockViewerToolbar() {
  const { setView, view, item, resizablePanelRef, setIframeKey, highlightedFiles } =
    useBlockViewer()
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  const iframeSrc = getIframeSrc(item)
  const installCommand = getInstallCommand(item)
  const installLabel = getInstallLabel(item)

  return (
    <div className="hidden w-full items-center gap-2 pl-2 md:pr-6 lg:flex">
      <Tabs value={view} onValueChange={(value) => setView(value as 'preview' | 'code')}>
        <TabsList className="grid h-8! grid-cols-2 items-center rounded-lg p-1 *:data-[slot=tabs-trigger]:h-6 *:data-[slot=tabs-trigger]:rounded-sm *:data-[slot=tabs-trigger]:px-2 *:data-[slot=tabs-trigger]:text-xs">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code" disabled={!highlightedFiles?.length}>
            Code
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Separator orientation="vertical" className="mx-2 h-4!" />
      <a
        href={`#${item.name}`}
        className="flex-1 text-center text-sm font-medium underline-offset-2 hover:underline md:flex-auto md:text-left"
      >
        {item.description?.replace(/\.$/, '')}
      </a>
      <div className="ml-auto flex items-center gap-2">
        <div className="h-8 items-center gap-1.5 rounded-md border p-[3px] shadow-none">
          <ToggleGroup
            type="single"
            defaultValue="100%"
            onValueChange={(value) => {
              setView('preview')
              if (resizablePanelRef?.current) {
                resizablePanelRef.current.resize(Number(value.replace('%', '')))
              }
            }}
            className="gap-1 *:data-[slot=toggle-group-item]:size-6! *:data-[slot=toggle-group-item]:rounded-sm!"
          >
            <ToggleGroupItem value="100%" title="Desktop">
              <Monitor />
            </ToggleGroupItem>
            <ToggleGroupItem value="60%" title="Tablet">
              <Tablet />
            </ToggleGroupItem>
            <ToggleGroupItem value="30%" title="Mobile">
              <Smartphone />
            </ToggleGroupItem>
            <Separator orientation="vertical" className="h-4!" />
            <Button
              size="icon"
              variant="ghost"
              className="size-6 rounded-sm p-0"
              asChild
              title="Open in New Tab"
            >
              <a href={iframeSrc} target="_blank" rel="noreferrer">
                <span className="sr-only">Open in New Tab</span>
                <Fullscreen />
              </a>
            </Button>
            <Separator orientation="vertical" className="h-4!" />
            <Button
              size="icon"
              variant="ghost"
              className="size-6 rounded-sm p-0"
              title="Refresh Preview"
              onClick={() => {
                if (setIframeKey) {
                  setIframeKey((k) => k + 1)
                }
              }}
            >
              <RotateCw />
              <span className="sr-only">Refresh Preview</span>
            </Button>
          </ToggleGroup>
        </div>
        <Separator orientation="vertical" className="mx-1 h-4!" />
        <Button
          variant="outline"
          className="w-fit gap-1 px-2 shadow-none"
          size="sm"
          onClick={() => {
            copyToClipboard(installCommand)
          }}
        >
          {isCopied ? <Check /> : <Terminal />}
          <span>{installLabel}</span>
        </Button>
      </div>
    </div>
  )
}

// ---- Preview (iframe + resizable) ----

function BlockViewerView() {
  const { item, resizablePanelRef, iframeKey } = useBlockViewer()
  const iframeSrc = getIframeSrc(item)

  return (
    <div className="hidden group-data-[view=code]/block-view-wrapper:hidden md:h-(--height) lg:flex">
      <div className="relative grid w-full gap-4">
        <div className="absolute inset-0 right-4 [background-image:radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:20px_20px] dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]" />
        <ResizablePanelGroup
          orientation="horizontal"
          className="relative z-10 after:absolute after:inset-0 after:right-3 after:z-0 after:rounded-xl after:bg-surface/50"
        >
          <ResizablePanel
            panelRef={resizablePanelRef}
            className="relative aspect-[4/2.5] overflow-hidden rounded-lg border bg-background md:aspect-auto md:rounded-xl"
            defaultSize={100}
            minSize={30}
          >
            <iframe
              key={iframeKey}
              title={`Preview of ${item.name}`}
              src={iframeSrc}
              height={item.iframeHeight ?? 930}
              loading="lazy"
              className="relative z-20 size-full bg-background"
            />
          </ResizablePanel>
          <ResizableHandle className="relative hidden w-3 bg-transparent p-0 after:absolute after:top-1/2 after:right-0 after:h-8 after:w-[6px] after:translate-x-[-1px] after:-translate-y-1/2 after:rounded-full after:bg-border after:transition-all after:hover:h-10 md:block" />
          <ResizablePanel defaultSize={0} minSize={0} />
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

// ---- Code panel ----

function BlockViewerCode() {
  const { activeFile, highlightedFiles } = useBlockViewer()

  const file = React.useMemo(() => {
    return highlightedFiles?.find((f) => f.target === activeFile)
  }, [highlightedFiles, activeFile])

  if (!file) {
    return null
  }

  const filePath = file.target ?? file.path ?? ''
  const language = filePath.split('.').pop() ?? 'tsx'

  return (
    <div className="mr-[14px] flex overflow-hidden rounded-xl border bg-code text-code-foreground group-data-[view=preview]/block-view-wrapper:hidden md:h-(--code-height)">
      <div className="flex w-72 flex-col overflow-y-auto">
        <BlockViewerFileTree />
      </div>
      <div className="flex min-w-0 flex-1 flex-col rounded-xl border-none">
        <div className="flex h-12 shrink-0 items-center gap-2 border-b px-4 py-2 text-code-foreground [&_svg]:size-4 [&_svg]:text-code-foreground [&_svg]:opacity-70">
          {getIconForLanguageExtension(language)}
          <span className="truncate">{file.target ?? file.path}</span>
          <div className="ml-auto flex items-center gap-2">
            <BlockCopyCodeButton />
          </div>
        </div>
        <div
          key={filePath}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: syntax highlighted
          dangerouslySetInnerHTML={{ __html: file.highlightedContent ?? '' }}
          className="no-scrollbar min-h-0 flex-1 overflow-y-auto"
        />
      </div>
    </div>
  )
}

export function BlockViewerFileTree() {
  const { tree } = useBlockViewer()

  if (!tree) return null

  return (
    <SidebarProvider className="flex min-h-full! flex-col border-r">
      <Sidebar collapsible="none" className="w-full flex-1">
        <SidebarGroupLabel className="h-12 rounded-none border-b px-4 text-sm">
          Files
        </SidebarGroupLabel>
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="translate-x-0 gap-1.5">
              {tree.map((item) => (
                <Tree key={item.name} item={item} index={1} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </Sidebar>
    </SidebarProvider>
  )
}

function Tree({ item, index }: { item: FileTree; index: number }) {
  const { activeFile, setActiveFile } = useBlockViewer()

  if (!item.children) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          isActive={item.path === activeFile}
          onClick={() => item.path && setActiveFile(item.path)}
          className="rounded-none pl-(--index) whitespace-nowrap hover:bg-muted-foreground/15 focus:bg-muted-foreground/15 focus-visible:bg-muted-foreground/15 active:bg-muted-foreground/15 data-[active=true]:bg-muted-foreground/15"
          style={{ '--index': `${index * 1.2}rem` } as React.CSSProperties}
        >
          <ChevronRight className="invisible" />
          <File className="size-4" />
          {item.name}
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            className="rounded-none pl-(--index) whitespace-nowrap hover:bg-muted-foreground/15 focus:bg-muted-foreground/15 focus-visible:bg-muted-foreground/15 active:bg-muted-foreground/15 data-[active=true]:bg-muted-foreground/15"
            style={{ '--index': `${index * 1}rem` } as React.CSSProperties}
          >
            <ChevronRight className="transition-transform" />
            <Folder />
            {item.name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="m-0 w-full translate-x-0 border-none p-0">
            {item.children.map((subItem) => (
              <Tree key={subItem.name} item={subItem} index={index + 1} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}

function BlockCopyCodeButton() {
  const { activeFile, highlightedFiles } = useBlockViewer()
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  const file = React.useMemo(() => {
    return highlightedFiles?.find((f) => f.target === activeFile)
  }, [activeFile, highlightedFiles])

  const content = file?.content

  if (!content) return null

  return (
    <Button variant="ghost" size="icon" className="size-7" onClick={() => copyToClipboard(content)}>
      {isCopied ? <Check /> : <Clipboard />}
    </Button>
  )
}

// ---- Mobile fallback ----

function BlockViewerMobile() {
  const { item } = useBlockViewer()
  const iframeSrc = getIframeSrc(item)

  return (
    <div className="flex flex-col gap-2 lg:hidden">
      <div className="flex items-center gap-2 px-2">
        <div className="line-clamp-1 text-sm font-medium">{item.description}</div>
        <div className="ml-auto shrink-0 font-mono text-xs text-muted-foreground">{item.name}</div>
      </div>
      <div className="overflow-hidden rounded-xl border">
        <iframe
          title={`Preview of ${item.name}`}
          src={iframeSrc}
          height={item.iframeHeight ?? 930}
          loading="lazy"
          style={{ height: item.iframeHeight ?? '930px' }}
          className="size-full bg-background"
        />
      </div>
    </div>
  )
}

// ---- Main export ----

export function BlockViewer({
  item,
  tree,
  highlightedFiles,
}: Pick<BlockViewerContext, 'item' | 'tree' | 'highlightedFiles'>) {
  return (
    <BlockViewerProvider item={item} tree={tree} highlightedFiles={highlightedFiles}>
      <BlockViewerToolbar />
      <BlockViewerView />
      <BlockViewerCode />
      <BlockViewerMobile />
    </BlockViewerProvider>
  )
}
