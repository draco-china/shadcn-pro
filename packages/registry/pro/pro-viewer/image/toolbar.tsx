'use client'

import { Maximize, Minimize, RotateCcw, RotateCw, X, ZoomIn, ZoomOut } from 'lucide-react'
import { ProToolbar, type ProToolbarItem } from '@/components/pro/pro-toolbar'
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
  const leftItems: ProToolbarItem[] = [
    {
      key: 'zoom-out',
      icon: <ZoomOut className="size-4" />,
      tooltip: 'Zoom out',
      'aria-label': 'Zoom out',
      variant: 'ghost',
      size: 'icon-sm',
      className: 'text-foreground hover:bg-accent hover:text-accent-foreground',
      onClick: onZoomOut,
    },
    {
      key: 'scale',
      render: () => (
        <span className="min-w-[48px] text-center text-sm tabular-nums">
          {Math.round(scale * 100)}%
        </span>
      ),
    },
    {
      key: 'zoom-in',
      icon: <ZoomIn className="size-4" />,
      tooltip: 'Zoom in',
      'aria-label': 'Zoom in',
      variant: 'ghost',
      size: 'icon-sm',
      className: 'text-foreground hover:bg-accent hover:text-accent-foreground',
      onClick: onZoomIn,
    },
    { key: 'zoom-separator', separator: true },
    {
      key: 'rotate-ccw',
      icon: <RotateCcw className="size-4" />,
      tooltip: 'Rotate counterclockwise',
      'aria-label': 'Rotate counterclockwise',
      variant: 'ghost',
      size: 'icon-sm',
      className: 'text-foreground hover:bg-accent hover:text-accent-foreground',
      onClick: onRotateCcw,
    },
    {
      key: 'rotate-cw',
      icon: <RotateCw className="size-4" />,
      tooltip: 'Rotate clockwise',
      'aria-label': 'Rotate clockwise',
      variant: 'ghost',
      size: 'icon-sm',
      className: 'text-foreground hover:bg-accent hover:text-accent-foreground',
      onClick: onRotateCw,
    },
    { key: 'rotate-separator', separator: true },
    {
      key: 'reset',
      label: <span className="text-xs">Reset</span>,
      variant: 'ghost',
      size: 'icon-sm',
      className: 'text-foreground hover:bg-accent hover:text-accent-foreground',
      onClick: onReset,
    },
    {
      key: 'fullscreen',
      icon: fullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />,
      tooltip: fullscreen ? 'Exit fullscreen' : 'Enter fullscreen',
      'aria-label': fullscreen ? 'Exit fullscreen' : 'Enter fullscreen',
      variant: 'ghost',
      size: 'icon-sm',
      className: 'text-foreground hover:bg-accent hover:text-accent-foreground',
      onClick: onToggleFullscreen,
    },
  ]
  const centerItems: ProToolbarItem[] =
    count > 1
      ? [
          {
            key: 'count',
            render: () => (
              <span className="text-sm text-muted-foreground">
                {index + 1} / {count}
              </span>
            ),
          },
        ]
      : []
  const rightItems: ProToolbarItem[] = [
    {
      key: 'close',
      icon: <X className="size-5" />,
      tooltip: 'Close image viewer',
      'aria-label': 'Close image viewer',
      variant: 'ghost',
      size: 'icon-sm',
      className: 'text-foreground hover:bg-accent hover:text-accent-foreground',
      onClick: onClose,
    },
  ]

  return (
    <ProToolbar
      className={cn('px-4 py-3 text-foreground', className)}
      left={{ options: leftItems, className: 'gap-1' }}
      center={{ options: centerItems }}
      right={{ options: rightItems }}
    />
  )
}
