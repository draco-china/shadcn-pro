'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Row } from '@tanstack/react-table'
import { GripVertical } from 'lucide-react'
import type { ReactNode } from 'react'
import { ProButton } from '@/components/pro/base/button'
import { cn } from '@/lib/utils'
import {
  tableDragButtonClassName,
  tableDragCellClassName,
  tableInteractiveRowClassName,
} from './classes'
import { ProTableCell, ProTableRowElement } from './elements'

export function SortableRow<TData>({
  row,
  children,
  paddingClass,
}: {
  row: Row<TData>
  children: ReactNode
  paddingClass: string
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: row.id,
  })

  return (
    <ProTableRowElement
      ref={setNodeRef}
      data-state={row.getIsSelected() && 'selected'}
      className={tableInteractiveRowClassName}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        position: isDragging ? 'relative' : undefined,
        zIndex: isDragging ? 10 : undefined,
      }}
    >
      <ProTableCell className={cn(paddingClass, tableDragCellClassName)}>
        <ProButton
          type="button"
          variant="ghost"
          size="icon-xs"
          {...attributes}
          {...listeners}
          className={tableDragButtonClassName}
          aria-label="Drag to reorder"
        >
          <GripVertical size={16} />
        </ProButton>
      </ProTableCell>
      {children}
    </ProTableRowElement>
  )
}
