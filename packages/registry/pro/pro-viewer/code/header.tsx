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
  const isLight = theme === 'github-light'

  return (
    <div className="flex h-7 shrink-0 items-center justify-between px-3">
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5 opacity-0 transition-opacity group-hover/code-viewer:opacity-100 group-focus-within/code-viewer:opacity-100">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span
          className={cn(
            'ml-1 text-[11px]',
            embedded ? 'text-muted-foreground' : isLight ? 'text-[#57606a]' : 'text-white/35',
          )}
        >
          {title}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'h-6 w-6 opacity-0 transition-opacity group-hover/code-viewer:opacity-100 group-focus-within/code-viewer:opacity-100',
          embedded
            ? 'text-muted-foreground hover:bg-muted hover:text-foreground'
            : isLight
              ? 'text-[#57606a] hover:bg-black/5 hover:text-[#24292f]'
              : 'text-white/50 hover:bg-white/10 hover:text-white/90',
        )}
        onClick={onCopy}
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </Button>
    </div>
  )
}
