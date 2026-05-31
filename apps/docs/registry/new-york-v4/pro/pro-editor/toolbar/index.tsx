'use client'

import { Check, Clipboard, Maximize2, Minimize2, WandSparkles } from 'lucide-react'
import type * as React from 'react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { getLanguageLabel } from '../language'

export interface EditorToolbarProps {
  language: string
  copied: boolean
  fullscreen: boolean
  children?: React.ReactNode
  startActions?: React.ReactNode
  actions?: React.ReactNode
  afterActions?: React.ReactNode
  format?: boolean
  copy?: boolean
  fullscreenControl?: boolean
  onFormat: () => void
  onCopy: () => void
  onFullscreenChange: React.Dispatch<React.SetStateAction<boolean>>
}

export function EditorToolbar({
  language,
  copied,
  fullscreen,
  children,
  startActions,
  actions,
  afterActions,
  format = true,
  copy = true,
  fullscreenControl = true,
  onFormat,
  onCopy,
  onFullscreenChange,
}: EditorToolbarProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-9 items-center justify-between border-b border-input bg-muted/40 px-2">
        <div className="flex h-full min-w-0 items-center gap-1">
          {startActions}
          <span className="px-3 text-sm font-medium text-foreground capitalize">
            {getLanguageLabel(language)}
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          {children}
          {actions}
          {format && (
            <EditorToolbarButton label="Format document" tooltip="Format" onClick={onFormat}>
              <WandSparkles size={14} />
            </EditorToolbarButton>
          )}
          {copy && (
            <EditorToolbarButton
              label="Copy"
              tooltip={copied ? 'Copied!' : 'Copy'}
              onClick={onCopy}
            >
              {copied ? <Check size={14} className="text-primary" /> : <Clipboard size={14} />}
            </EditorToolbarButton>
          )}
          {fullscreenControl && (
            <EditorToolbarButton
              label={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              tooltip={fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              onClick={() => onFullscreenChange((value) => !value)}
            >
              {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </EditorToolbarButton>
          )}
          {afterActions}
        </div>
      </div>
    </TooltipProvider>
  )
}

export function EditorToolbarButton({
  active,
  label,
  tooltip,
  type = 'button',
  disabled,
  className,
  onClick,
  children,
  ...buttonProps
}: {
  active?: boolean
  label: string
  tooltip: string
  type?: React.ComponentProps<typeof Button>['type']
  disabled?: boolean
  className?: string
  onClick: () => void
  children: React.ReactNode
} & Omit<
  React.ComponentProps<typeof Button>,
  'children' | 'className' | 'disabled' | 'onClick' | 'size' | 'variant'
>) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type={type}
          variant={active ? 'secondary' : 'ghost'}
          size="icon"
          className={cn('size-7', className)}
          disabled={disabled}
          onClick={onClick}
          aria-label={label}
          {...buttonProps}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  )
}
