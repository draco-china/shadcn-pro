'use client'

import { Copy } from 'lucide-react'
import { CopyButton } from '@/components/pro/base/button/copy'
import { cn } from '@/lib/utils'
import type { ViewerTheme } from '../shared/syntax'
import {
  codeViewerCopyButtonClassName,
  codeViewerCopyIconClassName,
  codeViewerHeaderClassName,
  codeViewerHeaderLeftClassName,
  codeViewerTitleClassName,
  codeViewerWindowControlPrimaryClassName,
  codeViewerWindowControlSecondaryClassName,
  codeViewerWindowControlsClassName,
  codeViewerWindowControlTertiaryClassName,
} from './classes'

export interface CodeViewerHeaderProps {
  title: string
  code: string
  embedded: boolean
  theme: ViewerTheme
}

export function CodeViewerHeader({ title, code, embedded, theme }: CodeViewerHeaderProps) {
  const isLight = theme === 'light'

  return (
    <div className={codeViewerHeaderClassName}>
      <div className={codeViewerHeaderLeftClassName}>
        <div className={codeViewerWindowControlsClassName}>
          <span className={codeViewerWindowControlPrimaryClassName} />
          <span className={codeViewerWindowControlSecondaryClassName} />
          <span className={codeViewerWindowControlTertiaryClassName} />
        </div>
        <span
          className={cn(
            codeViewerTitleClassName,
            embedded || isLight ? 'text-muted-foreground' : 'text-muted-foreground/70',
          )}
        >
          {title}
        </span>
      </div>
      <CopyButton
        variant="ghost"
        size="icon-xs"
        prefix={<Copy className={codeViewerCopyIconClassName} />}
        tooltip="Copy code"
        copy={{ text: code, success: 'Copied' }}
        className={cn(
          codeViewerCopyButtonClassName,
          embedded
            ? 'text-muted-foreground hover:bg-muted hover:text-foreground'
            : isLight
              ? 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              : 'text-muted-foreground hover:bg-accent/70 hover:text-foreground',
        )}
      />
    </div>
  )
}
