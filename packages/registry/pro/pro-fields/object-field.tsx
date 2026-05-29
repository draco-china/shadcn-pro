'use client'

import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export interface ObjectFieldProps {
  /** Section title */
  title?: ReactNode
  /** Subtitle / helper text below the title */
  description?: ReactNode
  /** Element rendered to the right of the title (e.g. an action button) */
  action?: ReactNode
  children?: ReactNode
  /** Whether the section can be collapsed */
  collapsible?: boolean
  defaultOpen?: boolean
  /** Visual style: 'bordered' (left border accent) | 'separated' (title + separator) | 'none' */
  variant?: 'bordered' | 'separated' | 'none'
  className?: string
  contentClassName?: string
}

export function ObjectField({
  title,
  description,
  action,
  children,
  collapsible = false,
  defaultOpen = true,
  variant = 'separated',
  className,
  contentClassName,
}: ObjectFieldProps) {
  const [open, setOpen] = useState(defaultOpen)

  const hasHeader = title || description || action

  const header = hasHeader && (
    <div
      className={cn(
        'flex items-start justify-between gap-2',
        variant === 'bordered' && 'mb-3',
        variant === 'separated' && 'mb-3',
      )}
    >
      <div className="min-w-0 flex-1">
        {title && (
          <p className="text-sm font-medium leading-none">{title}</p>
        )}
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-1">
        {action}
        {collapsible && (
          <CollapsibleTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground"
              aria-label={open ? 'Collapse' : 'Expand'}
            >
              <ChevronDown
                className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
              />
            </Button>
          </CollapsibleTrigger>
        )}
      </div>
    </div>
  )

  const content = (
    <div className={cn('space-y-4', contentClassName)}>{children}</div>
  )

  const inner = (
    <div
      className={cn(
        variant === 'bordered' && 'border-l-2 border-border pl-4',
        className,
      )}
    >
      {variant === 'separated' ? (
        <>
          {hasHeader && (
            <>
              {header}
              <Separator className="mb-4" />
            </>
          )}
          {content}
        </>
      ) : (
        <>
          {header}
          {content}
        </>
      )}
    </div>
  )

  if (collapsible) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <div
          className={cn(
            variant === 'bordered' && 'border-l-2 border-border pl-4',
            className,
          )}
        >
          {variant === 'separated' ? (
            <>
              {hasHeader && (
                <>
                  {header}
                  <Separator className="mb-4" />
                </>
              )}
              <CollapsibleContent>
                <div className={cn('space-y-4', contentClassName)}>{children}</div>
              </CollapsibleContent>
            </>
          ) : (
            <>
              {header}
              <CollapsibleContent>
                <div className={cn('space-y-4 pt-2', contentClassName)}>{children}</div>
              </CollapsibleContent>
            </>
          )}
        </div>
      </Collapsible>
    )
  }

  return inner
}

ObjectField.displayName = 'ObjectField'
