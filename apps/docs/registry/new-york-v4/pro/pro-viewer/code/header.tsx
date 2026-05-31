'use client'

import { Copy } from 'lucide-react'
import { ProButton } from '@/registry/new-york-v4/pro/pro-base'
import { cn } from '@/lib/utils'
import type { ViewerTheme } from './syntax'

export interface CodeViewerHeaderProps {
  title: string
  code: string
  embedded: boolean
  theme: ViewerTheme
}

export function CodeViewerHeader({ title, code, embedded, theme }: CodeViewerHeaderProps) {
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
      <ProButton
        variant="ghost"
        size="icon-xs"
        icon={<Copy className="size-3.5" />}
        tooltip="Copy code"
        copy={{ text: code, success: 'Copied' }}
        className={cn(
          'size-6 opacity-0 transition-opacity group-hover/code-viewer:opacity-100 group-focus-within/code-viewer:opacity-100',
          embedded
            ? 'text-muted-foreground hover:bg-muted hover:text-foreground'
            : isLight
              ? 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              : 'text-muted-foreground hover:bg-accent/70 hover:text-foreground',
        )}
        aria-label="Copy code"
      />
    </div>
  )
}
