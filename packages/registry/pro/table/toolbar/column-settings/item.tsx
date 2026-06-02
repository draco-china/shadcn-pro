'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Column } from '@tanstack/react-table'
import { GripVertical } from 'lucide-react'
import { useId } from 'react'
import { ProButton } from '@/components/pro/base/button'
import { CheckboxControl } from '@/components/pro/base/fields/checkbox/control'
import {
  columnSettingsDragButtonClassName,
  columnSettingsItemClassName,
  columnSettingsLabelClassName,
  columnSettingsLabelTextClassName,
} from '../classes'
import { ColumnPinningToggle } from './pinning-toggle'

export function SortableColumnItem<TData>({
  column,
  canPin,
}: {
  column: Column<TData, unknown>
  canPin: boolean
}) {
  const checkboxId = useId()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column.id,
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      className={columnSettingsItemClassName}
    >
      <ProButton
        type="button"
        variant="ghost"
        size="icon-xs"
        {...attributes}
        {...listeners}
        className={columnSettingsDragButtonClassName}
        aria-label="Drag to reorder"
      >
        <GripVertical size={14} />
      </ProButton>
      {canPin && column.getCanPin() && <ColumnPinningToggle column={column} position="left" />}
      <label htmlFor={checkboxId} className={columnSettingsLabelClassName}>
        <CheckboxControl
          id={checkboxId}
          checked={column.getIsVisible()}
          disabled={!column.getCanHide()}
          onCheckedChange={(checked) => column.toggleVisibility(checked === true)}
          onClick={(event) => event.stopPropagation()}
        />
        <span className={columnSettingsLabelTextClassName}>
          {typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id}
        </span>
      </label>
      {canPin && column.getCanPin() && <ColumnPinningToggle column={column} position="right" />}
    </div>
  )
}
