'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface Variant {
  name: string
  title: string
}

export function VariantsTabSwitcher({
  variants,
  previews,
  className,
}: {
  variants: Variant[]
  previews: React.ReactNode[]
  className?: string
}) {
  const [activeIdx, setActiveIdx] = React.useState(0)

  return (
    <div className={cn('mt-4 mb-12 flex flex-col gap-4', className)}>
      {/* Tab bar — outside the container, no border */}
      <div className="flex items-center gap-1">
        {variants.map((v, i) => (
          <button
            key={v.name}
            type="button"
            onClick={() => setActiveIdx(i)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              activeIdx === i
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {v.title}
          </button>
        ))}
      </div>

      {/* Container — standalone bordered box */}
      <div className="overflow-hidden rounded-xl border">{previews[activeIdx]}</div>
    </div>
  )
}
