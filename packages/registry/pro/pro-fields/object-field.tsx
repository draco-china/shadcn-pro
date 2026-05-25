'use client'

import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'

export interface ObjectFieldProps {
  title?: ReactNode
  children?: ReactNode
  collapsible?: boolean
  defaultOpen?: boolean
  className?: string
  contentClassName?: string
}

export function ObjectField({
  title,
  children,
  collapsible = false,
  defaultOpen = true,
  className,
  contentClassName,
}: ObjectFieldProps) {
  const [open, setOpen] = useState(defaultOpen)

  if (collapsible) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <Card className={className}>
          {title && (
            <CardHeader className="py-3">
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left"
                >
                  <CardTitle className="text-base">{title}</CardTitle>
                  <ChevronDown
                    className={cn('h-4 w-4 transition-transform', open && 'rotate-180')}
                  />
                </button>
              </CollapsibleTrigger>
            </CardHeader>
          )}
          <CollapsibleContent>
            <CardContent className={cn('space-y-4 pt-0', contentClassName)}>{children}</CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    )
  }

  return (
    <Card className={className}>
      {title && (
        <CardHeader className="py-3">
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn('space-y-4 pt-0', contentClassName)}>{children}</CardContent>
    </Card>
  )
}

ObjectField.displayName = 'ObjectField'
