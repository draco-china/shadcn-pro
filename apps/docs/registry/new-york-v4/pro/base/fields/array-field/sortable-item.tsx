import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { ProButton } from '@/components/pro/base/button'
import {
  arrayFieldDragButtonClassName,
  arrayFieldDragIconClassName,
  arrayFieldItemClassName,
  arrayFieldItemContentClassName,
  arrayFieldRemoveButtonClassName,
  arrayFieldRemoveIconClassName,
} from './classes'

interface SortableItemProps {
  id: string
  children: ReactNode
  onRemove: () => void
  disabled?: boolean
  canRemove?: boolean
}

export function SortableItem({
  id,
  children,
  onRemove,
  disabled,
  canRemove = true,
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      className={arrayFieldItemClassName}
    >
      <ProButton
        type="button"
        {...attributes}
        {...listeners}
        variant="ghost"
        size="icon-sm"
        prefix={<GripVertical className={arrayFieldDragIconClassName} />}
        disabled={disabled}
        className={arrayFieldDragButtonClassName}
        aria-label="Drag to reorder"
      />

      <div className={arrayFieldItemContentClassName}>{children}</div>

      {canRemove && (
        <ProButton
          type="button"
          variant="ghost"
          size="icon-sm"
          prefix={<Trash2 className={arrayFieldRemoveIconClassName} />}
          disabled={disabled}
          className={arrayFieldRemoveButtonClassName}
          onClick={onRemove}
          aria-label="Remove item"
        />
      )}
    </div>
  )
}
