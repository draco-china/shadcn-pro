'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Row } from '@tanstack/react-table'
import { GripVertical } from 'lucide-react'
import type * as React from 'react'
import { TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

export function SortableRow<TData>({
  row,
  children,
  paddingClass,
}: {
  row: Row<TData>
  children: React.ReactNode
  paddingClass: string
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: row.id,
  })

  return (
    <TableRow
      ref={setNodeRef}
      data-state={row.getIsSelected() && 'selected'}
      className="group"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        position: isDragging ? 'relative' : undefined,
        zIndex: isDragging ? 10 : undefined,
      }}
    >
      <TableCell className={cn(paddingClass, 'w-8 pr-0')}>
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-grab text-muted-foreground transition-colors hover:text-foreground active:cursor-grabbing"
          aria-label="Drag to reorder"
        >
          <GripVertical size={16} />
        </button>
      </TableCell>
      {children}
    </TableRow>
  )
}
