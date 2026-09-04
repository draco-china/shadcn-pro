'use client'

import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { type Cell, type Column, flexRender, type Row } from '@tanstack/react-table'
import { GripVertical, Inbox } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { ProButton } from '../base/button'

/** Measured left and right offsets for sticky table columns. */
export interface ProTablePinnedColumnOffsets {
  left: Record<string, number>
  right: Record<string, number>
}

/** Renders loading, empty, static, and sortable ProTable rows. */
export function ProTableBody<TData>({
  rows,
  visibleColumns,
  visibleColumnCount,
  dragSort,
  loading,
  loadingRows,
  paddingClass,
  emptyFallbackText,
  pinnedOffsets,
}: {
  rows: Row<TData>[]
  visibleColumns: ReturnType<Row<TData>['getVisibleCells']>[number]['column'][]
  visibleColumnCount: number
  dragSort: boolean
  loading: boolean
  loadingRows: number
  paddingClass: string
  emptyFallbackText?: ReactNode
  pinnedOffsets: ProTablePinnedColumnOffsets
}) {
  const emptyRow = (
    <tr
      data-slot="pro-table-row"
      className="border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted"
    >
      <td
        data-slot="pro-table-cell"
        colSpan={visibleColumnCount}
        className="h-32 p-2 text-center align-middle whitespace-nowrap text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
      >
        <div className="flex flex-col items-center gap-2">
          <Inbox className="size-8 opacity-40" />
          <span className="text-sm">{emptyFallbackText ?? 'No data'}</span>
        </div>
      </td>
    </tr>
  )

  if (loading) {
    return Array.from({ length: loadingRows }, (_, index) => (
      <tr
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows are fixed placeholders.
        key={`skeleton-row-${index}`}
        data-slot="pro-table-row"
        className="group/row border-b transition-colors duration-150 hover:bg-muted has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted"
      >
        {dragSort && (
          <td
            data-slot="pro-table-cell"
            className="sticky left-0 z-20 w-8 bg-background p-2 pr-0 align-middle whitespace-nowrap shadow-[6px_0_10px_-10px_hsl(var(--foreground)/0.45),1px_0_0_0_var(--border)] transition-colors duration-150 group-hover/row:bg-muted [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
          >
            <div
              data-slot="pro-table-skeleton"
              className="size-4 animate-pulse rounded-md bg-accent"
            />
          </td>
        )}
        {visibleColumns.map((column) => (
          <td
            key={column.id}
            data-slot="pro-table-cell"
            className={getPinnedColumnClassName(
              column,
              cn(
                'p-2 align-middle whitespace-nowrap transition-colors duration-150 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
                column.columnDef.meta?.className,
              ),
            )}
            style={getPinnedColumnStyle(column, pinnedOffsets, dragSort ? 32 : 0)}
            data-pro-table-column-id={column.id}
          >
            <div
              data-slot="pro-table-skeleton"
              className="h-4 w-full animate-pulse rounded-md bg-accent"
            />
          </td>
        ))}
      </tr>
    ))
  }

  if (dragSort) {
    return (
      <SortableContext items={rows.map((row) => row.id)} strategy={verticalListSortingStrategy}>
        {rows.map((row) => (
          <SortableRow key={row.id} row={row} paddingClass={paddingClass}>
            {row.getVisibleCells().map((cell) => (
              <BodyCell
                key={cell.id}
                cell={cell}
                dragSort
                paddingClass={paddingClass}
                pinnedOffsets={pinnedOffsets}
              />
            ))}
          </SortableRow>
        ))}
        {rows.length === 0 && emptyRow}
      </SortableContext>
    )
  }

  if (rows.length === 0) return emptyRow
  return rows.map((row) => (
    <tr
      key={row.id}
      data-slot="pro-table-row"
      data-state={row.getIsSelected() && 'selected'}
      className="group/row border-b transition-colors duration-150 hover:bg-muted has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted"
    >
      {row.getVisibleCells().map((cell) => (
        <BodyCell
          key={cell.id}
          cell={cell}
          paddingClass={paddingClass}
          pinnedOffsets={pinnedOffsets}
        />
      ))}
    </tr>
  ))
}

function BodyCell<TData>({
  cell,
  dragSort,
  paddingClass,
  pinnedOffsets,
}: {
  cell: Cell<TData, unknown>
  dragSort?: boolean
  paddingClass: string
  pinnedOffsets: ProTablePinnedColumnOffsets
}) {
  const meta = cell.column.columnDef.meta
  const pinned = cell.column.getIsPinned()
  const align = meta?.align ?? (pinned === 'right' ? 'right' : pinned || undefined)
  const filter = meta?.filter
  const autoRender = !!filter && cell.column.columnDef.cell === undefined
  const values = getAutoFilterValues(autoRender, cell.getValue())
  const labels = new Map(
    autoRender ? filter.options.map((option) => [option.value, option.label] as const) : [],
  )

  return (
    <td
      data-slot="pro-table-cell"
      className={getPinnedColumnClassName(
        cell.column,
        cn(
          'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
          paddingClass,
          align === 'center' && 'text-center',
          align === 'right' && 'text-right',
          align === 'left' && 'text-left',
          meta?.className,
        ),
      )}
      style={getPinnedColumnStyle(cell.column, pinnedOffsets, dragSort ? 32 : 0)}
      data-pro-table-column-id={cell.column.id}
    >
      <TableCellContent autoRender={autoRender} values={values} labels={labels} cell={cell} />
    </td>
  )
}

function TableCellContent<TData>({
  autoRender,
  values,
  labels,
  cell,
}: {
  autoRender: boolean
  values: string[]
  labels: Map<string, string>
  cell: Cell<TData, unknown>
}) {
  if (!autoRender) return flexRender(cell.column.columnDef.cell, cell.getContext())
  if (values.length === 0) return <span className="text-muted-foreground">-</span>

  return (
    <div className="flex flex-wrap gap-1">
      {values.map((value) => (
        <span
          key={value}
          className="inline-flex shrink-0 items-center justify-center rounded-sm bg-secondary px-2 py-0.5 text-xs font-normal text-secondary-foreground"
        >
          {labels.get(value) ?? value}
        </span>
      ))}
    </div>
  )
}

function SortableRow<TData>({
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
    <tr
      ref={setNodeRef}
      data-slot="pro-table-row"
      data-state={row.getIsSelected() && 'selected'}
      className="group/row border-b transition-colors duration-150 hover:bg-muted has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        position: isDragging ? 'relative' : undefined,
        zIndex: isDragging ? 10 : undefined,
      }}
    >
      <td
        data-slot="pro-table-cell"
        className={cn(
          'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
          paddingClass,
          'sticky left-0 z-20 w-8 bg-background pr-0 shadow-[6px_0_10px_-10px_hsl(var(--foreground)/0.45),1px_0_0_0_var(--border)] transition-colors duration-150 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        )}
      >
        <ProButton
          variant="ghost"
          size="icon-xs"
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing"
          aria-label="Drag to reorder"
        >
          <GripVertical />
        </ProButton>
      </td>
      {children}
    </tr>
  )
}

function getAutoFilterValues(autoRender: boolean, cellValue: unknown) {
  if (!autoRender) return []
  if (typeof cellValue === 'string') return [cellValue]
  if (Array.isArray(cellValue) && cellValue.every((item) => typeof item === 'string'))
    return cellValue
  return []
}

/** Returns sticky-column classes shared by table headers and body cells. */
export function getPinnedColumnClassName<TData>(
  column: Column<TData, unknown>,
  className?: string,
) {
  const pinned = column.getIsPinned()

  return cn(
    pinned &&
      'sticky z-10 bg-background transition-colors duration-150 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
    pinned === 'left' &&
      column.getIsLastColumn('left') &&
      'shadow-[6px_0_10px_-10px_hsl(var(--foreground)/0.45),1px_0_0_0_var(--border)]',
    pinned === 'right' &&
      column.getIsFirstColumn('right') &&
      'shadow-[-6px_0_10px_-10px_hsl(var(--foreground)/0.45),-1px_0_0_0_var(--border)]',
    className,
  )
}

/** Computes sticky-column inline offsets after measured widths are applied. */
export function getPinnedColumnStyle<TData>(
  column: Column<TData, unknown>,
  offsets: ProTablePinnedColumnOffsets,
  leftOffset = 0,
): CSSProperties {
  const pinned = column.getIsPinned()
  const style: CSSProperties = {}

  if (pinned === 'left') {
    style.left = `${offsets.left[column.id] ?? column.getStart('left') + leftOffset}px`
  }
  if (pinned === 'right') {
    style.right = `${offsets.right[column.id] ?? column.getAfter('right')}px`
  }

  return style
}
