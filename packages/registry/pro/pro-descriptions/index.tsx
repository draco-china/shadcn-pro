import type * as React from 'react'
import { cn } from '@/lib/utils'

export interface DescriptionsItem {
  label: React.ReactNode
  value?: React.ReactNode
  span?: number // how many columns this item occupies (default 1)
  className?: string
}

export interface ProDescriptionsProps {
  title?: React.ReactNode
  items: DescriptionsItem[]
  columns?: 1 | 2 | 3 | 4
  bordered?: boolean
  layout?: 'horizontal' | 'vertical'
  className?: string
  labelClassName?: string
  valueClassName?: string
}

export function ProDescriptions({
  title,
  items,
  columns = 2,
  bordered = false,
  layout = 'horizontal',
  className,
  labelClassName,
  valueClassName,
}: ProDescriptionsProps) {
  const colClass: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }

  const spanClass: Record<number, string> = {
    1: 'col-span-1',
    2: 'col-span-1 sm:col-span-2',
    3: 'col-span-1 sm:col-span-2 lg:col-span-3',
    4: 'col-span-1 sm:col-span-2 lg:col-span-4',
  }

  return (
    <div className={cn('w-full', className)}>
      {title && <div className="mb-4 text-base font-semibold text-foreground">{title}</div>}
      <div
        className={cn(
          'grid gap-0',
          colClass[columns],
          bordered && 'border rounded-md overflow-hidden',
        )}
      >
        {items.map((item, index) => {
          const span = Math.min(Math.max(item.span ?? 1, 1), columns)

          return (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: no stable key available
              key={index}
              className={cn(
                'flex',
                spanClass[span],
                layout === 'horizontal' ? 'flex-col sm:flex-row' : 'flex-col',
                bordered && 'border-b border-r',
                item.className,
              )}
            >
              <div
                className={cn(
                  'shrink-0 text-sm font-medium text-muted-foreground',
                  bordered ? 'px-4 py-3 bg-muted/40' : 'py-2 pr-4',
                  layout === 'horizontal' ? 'sm:w-32' : 'mb-1',
                  labelClassName,
                )}
              >
                {item.label}
              </div>
              <div
                className={cn(
                  'text-sm text-foreground flex-1',
                  bordered ? 'px-4 py-3' : 'py-2',
                  valueClassName,
                )}
              >
                {item.value ?? <span className="text-muted-foreground">—</span>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
