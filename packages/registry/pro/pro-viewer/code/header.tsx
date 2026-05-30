'use client'

import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ViewerTheme } from './syntax'

export interface CodeViewerHeaderProps {
  title: string
  copied: boolean
  embedded: boolean
  theme: ViewerTheme
  onCopy: () => void
}

export function CodeViewerHeader({
  title,
  copied,
  embedded,
  theme,
  onCopy,
}: CodeViewerHeaderProps) {
  const isLight = theme === 'light'

  return (
    <div className="flex h-7 shrink-0 items-center justify-between px-3">
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5 opacity-0 transition-opacity group-hover/code-viewer:opacity-100 group-focus-within/code-viewer:opacity-100">
          <span className="size-2.5 rounded-full bg-muted-foreground/45" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-muted-foreground/20" />
        </div>
        <span
          className={cn(
            'ml-1 text-[11px]',
            embedded || isLight ? 'text-muted-foreground' : 'text-muted-foreground/70',
          )}
        >
          {title}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'size-6 opacity-0 transition-opacity group-hover/code-viewer:opacity-100 group-focus-within/code-viewer:opacity-100',
          embedded
            ? 'text-muted-foreground hover:bg-muted hover:text-foreground'
            : isLight
              ? 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              : 'text-muted-foreground hover:bg-accent/70 hover:text-foreground',
        )}
        onClick={onCopy}
        aria-label="Copy code"
      >
        {copied ? <Check className="size-3.5 text-primary" /> : <Copy className="size-3.5" />}
      </Button>
    </div>
  )
}
