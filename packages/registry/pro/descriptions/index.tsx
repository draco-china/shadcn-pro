import { cva } from 'class-variance-authority'
import type { Key, ReactNode } from 'react'
import { cn } from '@/lib/utils'

const descriptionsGridVariants = cva('grid gap-0', {
  variants: {
    columns: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    },
    bordered: {
      true: 'overflow-hidden rounded-md border',
    },
  },
  defaultVariants: {
    columns: 2,
    bordered: false,
  },
})

const descriptionsItemVariants = cva('flex', {
  variants: {
    span: {
      1: 'col-span-1',
      2: 'col-span-1 sm:col-span-2',
      3: 'col-span-1 sm:col-span-2 lg:col-span-3',
      4: 'col-span-1 sm:col-span-2 lg:col-span-4',
    },
    layout: {
      horizontal: 'flex-col sm:flex-row',
      vertical: 'flex-col',
    },
    bordered: {
      true: 'border-r border-b',
    },
  },
  defaultVariants: {
    span: 1,
    layout: 'horizontal',
    bordered: false,
  },
})

const descriptionsLabelVariants = cva('shrink-0 text-sm font-medium text-muted-foreground', {
  variants: {
    layout: {
      horizontal: 'sm:w-32',
      vertical: 'mb-1',
    },
    bordered: {
      true: 'bg-muted/40 px-4 py-3',
      false: 'py-2 pr-4',
    },
  },
  defaultVariants: {
    layout: 'horizontal',
    bordered: false,
  },
})

const descriptionsValueVariants = cva('flex-1 text-sm text-foreground', {
  variants: {
    bordered: {
      true: 'px-4 py-3',
      false: 'py-2',
    },
  },
  defaultVariants: {
    bordered: false,
  },
})

export function ProDescriptions({
  title,
  items,
  columns = 2,
  bordered = false,
  layout = 'horizontal',
  className,
}: {
  title?: ReactNode
  items: {
    key?: Key
    label: ReactNode
    value?: ReactNode
    span?: 1 | 2 | 3 | 4
    className?: string
  }[]
  columns?: 1 | 2 | 3 | 4
  bordered?: boolean
  layout?: 'horizontal' | 'vertical'
  className?: string
}) {
  return (
    <div className={cn('w-full', className)}>
      {title != null && <div className="mb-4 text-base font-semibold text-foreground">{title}</div>}
      <div className={descriptionsGridVariants({ columns, bordered })}>
        {items.map((item, index) => (
          <div
            key={item.key ?? index}
            className={descriptionsItemVariants({
              span: item.span,
              layout,
              bordered,
              className: item.className,
            })}
          >
            <div
              className={descriptionsLabelVariants({
                layout,
                bordered,
              })}
            >
              {item.label}
            </div>
            <div className={descriptionsValueVariants({ bordered })}>
              {item.value ?? <span className="text-muted-foreground">—</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
