'use client'

import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react'
import type * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface ArrayFieldProps<TItem = unknown> {
  value?: TItem[]
  renderItem?: (item: TItem, index: number) => React.ReactNode
  onAdd?: () => void
  onRemove?: (index: number) => void
  onMoveUp?: (index: number) => void
  onMoveDown?: (index: number) => void
  addText?: React.ReactNode
  disabled?: boolean
  className?: string
  itemClassName?: string
}

export function ArrayField<TItem = unknown>({
  value = [],
  renderItem,
  onAdd,
  onRemove,
  onMoveUp,
  onMoveDown,
  addText = 'Add',
  disabled,
  className,
  itemClassName,
}: ArrayFieldProps<TItem>) {
  return (
    <div className={cn('space-y-3', className)}>
      {value.map((item, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: array field items are ordered by index
        <Card key={index} className={cn('border', itemClassName)}>
          <CardContent className="pt-4">
            <div className="flex gap-2">
              <div className="min-w-0 flex-1">{renderItem?.(item, index)}</div>
              <div className="flex flex-col gap-1">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  disabled={disabled || index === 0}
                  onClick={() => onMoveUp?.(index)}
                  aria-label="Move item up"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  disabled={disabled || index === value.length - 1}
                  onClick={() => onMoveDown?.(index)}
                  aria-label="Move item down"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  disabled={disabled}
                  className="text-destructive hover:text-destructive"
                  onClick={() => onRemove?.(index)}
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        onClick={onAdd}
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        {addText}
      </Button>
    </div>
  )
}

ArrayField.displayName = 'ArrayField'
