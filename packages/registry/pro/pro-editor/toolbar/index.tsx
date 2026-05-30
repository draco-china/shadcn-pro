'use client'

import { Check, Clipboard, Maximize2, Minimize2, WandSparkles } from 'lucide-react'
import type * as React from 'react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { getLanguageLabel } from '../language'

export interface EditorToolbarProps {
  language: string
  copied: boolean
  fullscreen: boolean
  children?: React.ReactNode
  before?: React.ReactNode
  actions?: React.ReactNode
  after?: React.ReactNode
  onFormat: () => void
  onCopy: () => void
  onFullscreenChange: React.Dispatch<React.SetStateAction<boolean>>
}

export function EditorToolbar({
  language,
  copied,
  fullscreen,
  children,
  before,
  actions,
  after,
  onFormat,
  onCopy,
  onFullscreenChange,
}: EditorToolbarProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-9 items-center justify-between border-b border-input bg-muted/40 px-2">
        <div className="flex h-full min-w-0 items-center gap-1">
          {before}
          <span className="px-3 text-sm font-medium text-foreground capitalize">
            {getLanguageLabel(language)}
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          {children}
          {actions}
          <EditorToolbarButton label="Format document" tooltip="Format" onClick={onFormat}>
            <WandSparkles size={14} />
          </EditorToolbarButton>
          <EditorToolbarButton label="Copy" tooltip={copied ? 'Copied!' : 'Copy'} onClick={onCopy}>
            {copied ? <Check size={14} className="text-primary" /> : <Clipboard size={14} />}
          </EditorToolbarButton>
          <EditorToolbarButton
            label={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            tooltip={fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            onClick={() => onFullscreenChange((value) => !value)}
          >
            {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </EditorToolbarButton>
          {after}
        </div>
      </div>
    </TooltipProvider>
  )
}

export function EditorToolbarButton({
  active,
  label,
  tooltip,
  onClick,
  children,
}: {
  active?: boolean
  label: string
  tooltip: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={active ? 'secondary' : 'ghost'}
          size="icon"
          className="size-7"
          onClick={onClick}
          aria-label={label}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  )
}
