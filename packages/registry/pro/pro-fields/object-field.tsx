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
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          {title && <p className="text-sm font-medium leading-none">{title}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {action}
          {collapsible && (
            <CollapsibleTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-6 text-muted-foreground"
                aria-label={open ? 'Collapse' : 'Expand'}
              >
                <ChevronDown
                  className={cn('size-4 transition-transform duration-200', open && 'rotate-180')}
                />
              </Button>
            </CollapsibleTrigger>
          )}
        </div>
      </div>
      {description && (
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      )}
    </div>
  )

  const separated = variant === 'separated'
  const rootClassName = cn(variant === 'bordered' && 'border-l-2 border-border pl-4', className)
  const contentClassNameValue = cn(
    'space-y-4',
    collapsible && !separated && hasHeader && 'pt-2',
    contentClassName,
  )
  const content = <div className={contentClassNameValue}>{children}</div>
  const body = (
    <>
      {header}
      {separated && hasHeader && <Separator className="mb-4" />}
      {collapsible ? <CollapsibleContent>{content}</CollapsibleContent> : content}
    </>
  )

  if (collapsible) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className={rootClassName}>{body}</div>
      </Collapsible>
    )
  }

  return <div className={rootClassName}>{body}</div>
}

ObjectField.displayName = 'ObjectField'
