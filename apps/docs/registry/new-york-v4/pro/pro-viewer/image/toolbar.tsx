'use client'

import { Maximize, Minimize, RotateCcw, RotateCw, X, ZoomIn, ZoomOut } from 'lucide-react'
import type * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface ImageViewerToolbarProps {
  scale: number
  count: number
  index: number
  fullscreen: boolean
  className?: string
  onZoomIn: () => void
  onZoomOut: () => void
  onRotateCcw: () => void
  onRotateCw: () => void
  onReset: () => void
  onToggleFullscreen: () => void
  onClose: () => void
}

export function ImageViewerToolbar({
  scale,
  count,
  index,
  fullscreen,
  className,
  onZoomIn,
  onZoomOut,
  onRotateCcw,
  onRotateCw,
  onReset,
  onToggleFullscreen,
  onClose,
}: ImageViewerToolbarProps) {
  return (
    <div className={cn('flex items-center justify-between px-4 py-3 text-foreground', className)}>
      <div className="flex items-center gap-1">
        <ToolbarButton
          label="Zoom out"
          onClick={onZoomOut}
          icon={<ZoomOut className="size-4" />}
        />
        <span className="min-w-[48px] text-center text-sm tabular-nums">
          {Math.round(scale * 100)}%
        </span>
        <ToolbarButton label="Zoom in" onClick={onZoomIn} icon={<ZoomIn className="size-4" />} />
        <Separator />
        <ToolbarButton
          label="Rotate counterclockwise"
          onClick={onRotateCcw}
          icon={<RotateCcw className="size-4" />}
        />
        <ToolbarButton
          label="Rotate clockwise"
          onClick={onRotateCw}
          icon={<RotateCw className="size-4" />}
        />
        <Separator />
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground hover:bg-accent hover:text-accent-foreground"
          onClick={onReset}
        >
          <span className="text-xs">Reset</span>
        </Button>
        <ToolbarButton
          label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          onClick={onToggleFullscreen}
          icon={fullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
        />
      </div>

      {count > 1 && (
        <span className="text-sm text-muted-foreground">
          {index + 1} / {count}
        </span>
      )}

      <ToolbarButton
        label="Close image viewer"
        onClick={onClose}
        icon={<X className="size-5" />}
      />
    </div>
  )
}

function ToolbarButton({
  label,
  icon,
  onClick,
}: {
  label: string
  icon: React.ReactNode
  onClick: () => void
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-foreground hover:bg-accent hover:text-accent-foreground"
      onClick={onClick}
      aria-label={label}
    >
      {icon}
    </Button>
  )
}

function Separator() {
  return <div className="mx-2 h-4 w-px bg-border" />
}
