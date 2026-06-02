'use client'

import type { Column } from '@tanstack/react-table'
import { Pin, PinOff } from 'lucide-react'
import { ProButton } from '@/components/pro/base/button'
import { cn } from '@/lib/utils'
import { columnSettingsActivePinClassName, columnSettingsInactivePinClassName } from '../classes'

export function ColumnPinningToggle<TData>({
  column,
  position,
}: {
  column: Column<TData, unknown>
  position: 'left' | 'right'
}) {
  const pinned = column.getIsPinned()
  const active = pinned === position
  const label = position === 'left' ? 'Pin left' : 'Pin right'

  return (
    <ProButton
      type="button"
      variant="ghost"
      size="icon-xs"
      className={cn(
        'shrink-0',
        active ? columnSettingsActivePinClassName : columnSettingsInactivePinClassName,
      )}
      aria-pressed={active}
      aria-label={active ? `Unpin ${position}` : label}
      title={active ? `Unpin ${position}` : label}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.stopPropagation()
        column.pin(active ? false : position)
      }}
    >
      {active ? <PinOff size={14} /> : <Pin size={14} />}
    </ProButton>
  )
}
