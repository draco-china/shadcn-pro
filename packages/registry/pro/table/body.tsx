'use client'

import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { type Cell, type Column, flexRender, type Row } from '@tanstack/react-table'
import { GripVertical, Inbox } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { ProButton } from '../base/button'

const TABLE_ROW_CLASS_NAME =
  'group/row bg-background transition-colors duration-150 hover:bg-muted has-aria-expanded:bg-muted data-[state=selected]:bg-muted'
const TABLE_CELL_STATE_CLASS_NAME = 'bg-inherit bg-clip-padding'
const TABLE_ROW_COLOR_TRANSITION =
  'color 150ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)'

/** Measured left and right offsets for sticky table columns. */
export interface ProTablePinnedColumnOffsets {
  left: Record<string, number>
  right: Record<string, number>
  dragWidth: number
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
    <tr data-slot="pro-table-row" className={TABLE_ROW_CLASS_NAME}>
      <td
        data-slot="pro-table-cell"
        colSpan={visibleColumnCount}
        className={cn(
          'h-32 p-2 text-center align-middle whitespace-nowrap text-muted-foreground [&:has([role=checkbox])]:pr-0 [&_[role=checkbox]]:border-border [&_[role=checkbox]]:shadow-none [&>[role=checkbox]]:translate-y-[2px] dark:[&_[role=checkbox][data-state=unchecked]]:bg-transparent',
          TABLE_CELL_STATE_CLASS_NAME,
        )}
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
        className={TABLE_ROW_CLASS_NAME}
      >
        {dragSort && (
          <td
            data-slot="pro-table-cell"
            data-pro-table-drag-column=""
            className={cn(
              'sticky left-0 z-20 w-8 p-2 pr-0 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&_[role=checkbox]]:border-border [&_[role=checkbox]]:shadow-none [&>[role=checkbox]]:translate-y-[2px] dark:[&_[role=checkbox][data-state=unchecked]]:bg-transparent',
              TABLE_CELL_STATE_CLASS_NAME,
            )}
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
                'p-2 align-middle whitespace-nowrap transition-colors duration-150 [&:has([role=checkbox])]:pr-0 [&_[role=checkbox]]:border-border [&_[role=checkbox]]:shadow-none [&>[role=checkbox]]:translate-y-[2px] dark:[&_[role=checkbox][data-state=unchecked]]:bg-transparent',
                TABLE_CELL_STATE_CLASS_NAME,
                column.columnDef.meta?.className,
              ),
            )}
            style={getPinnedColumnStyle(column, pinnedOffsets)}
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
      className={TABLE_ROW_CLASS_NAME}
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
  paddingClass,
  pinnedOffsets,
}: {
  cell: Cell<TData, unknown>
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
          'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&_[role=checkbox]]:border-border [&_[role=checkbox]]:shadow-none [&>[role=checkbox]]:translate-y-[2px] dark:[&_[role=checkbox][data-state=unchecked]]:bg-transparent',
          TABLE_CELL_STATE_CLASS_NAME,
          paddingClass,
          align === 'center' && 'text-center',
          align === 'right' && 'text-right',
          align === 'left' && 'text-left',
          meta?.className,
        ),
      )}
      style={getPinnedColumnStyle(cell.column, pinnedOffsets)}
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
      className={TABLE_ROW_CLASS_NAME}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: [transition, TABLE_ROW_COLOR_TRANSITION].filter(Boolean).join(', '),
        opacity: isDragging ? 0.5 : 1,
        position: isDragging ? 'relative' : undefined,
        zIndex: isDragging ? 10 : undefined,
      }}
    >
      <td
        data-slot="pro-table-cell"
        data-pro-table-drag-column=""
        className={cn(
          'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&_[role=checkbox]]:border-border [&_[role=checkbox]]:shadow-none [&>[role=checkbox]]:translate-y-[2px] dark:[&_[role=checkbox][data-state=unchecked]]:bg-transparent',
          paddingClass,
          TABLE_CELL_STATE_CLASS_NAME,
          'sticky left-0 z-20 w-8 pr-0',
        )}
      >
        <ProButton
          variant="link"
          size="icon-xs"
          {...attributes}
          {...listeners}
          className="cursor-grab text-muted-foreground no-underline hover:text-foreground hover:no-underline active:cursor-grabbing"
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
    column.columnDef.meta?.__proTableFixedSize !== undefined && 'truncate',
    pinned && 'sticky z-10',
    className,
  )
}

/** Computes sticky-column inline offsets after measured widths are applied. */
export function getPinnedColumnStyle<TData>(
  column: Column<TData, unknown>,
  offsets: ProTablePinnedColumnOffsets,
): CSSProperties {
  const pinned = column.getIsPinned()
  const style: CSSProperties = {}
  const fixedSize = column.columnDef.meta?.__proTableFixedSize

  if (typeof fixedSize === 'number') {
    style.width = `${fixedSize}px`
    style.minWidth = `${fixedSize}px`
    style.maxWidth = `${fixedSize}px`
  } else {
    style.width = 'var(--pro-table-flex-column-width)'
  }

  if (pinned === 'left') {
    const left = offsets.left[column.id] ?? column.getStart('left') + offsets.dragWidth
    style.left = `${left}px`
  }
  if (pinned === 'right') {
    style.right = `${offsets.right[column.id] ?? column.getAfter('right')}px`
  }

  return style
}
