'use client'

import * as React from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/registry/new-york-v4/ui/badge'
import { ProTable } from '@/registry/new-york-v4/pro/pro-table/index'

type Task = {
  id: string
  title: string
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in-progress' | 'done'
}

const initialData: Task[] = [
  { id: '1', title: 'Design system architecture', priority: 'high', status: 'done' },
  { id: '2', title: 'Set up dev environment', priority: 'high', status: 'done' },
  { id: '3', title: 'Implement ProTable component', priority: 'high', status: 'in-progress' },
  { id: '4', title: 'Implement ProForm component', priority: 'medium', status: 'in-progress' },
  { id: '5', title: 'Write unit tests', priority: 'medium', status: 'todo' },
  { id: '6', title: 'Improve documentation site', priority: 'low', status: 'todo' },
  { id: '7', title: 'Publish npm package', priority: 'low', status: 'todo' },
]

const priorityVariant: Record<Task['priority'], 'destructive' | 'default' | 'secondary'> = {
  high: 'destructive',
  medium: 'default',
  low: 'secondary',
}

const priorityLabel: Record<Task['priority'], string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

const statusLabel: Record<Task['status'], string> = {
  'todo': 'Todo',
  'in-progress': 'In Progress',
  'done': 'Done',
}

const columns: ColumnDef<Task>[] = [
  { accessorKey: 'title', header: 'Task' },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => (
      <Badge variant={priorityVariant[row.getValue('priority') as Task['priority']]}>
        {priorityLabel[row.getValue('priority') as Task['priority']]}
      </Badge>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {statusLabel[row.getValue('status') as Task['status']]}
      </span>
    ),
  },
]

export default function ProTableDragSortDemo() {
  const [order, setOrder] = React.useState<string[]>([])

  return (
    <div className="size-full space-y-3 p-4">
      <ProTable
        data={initialData}
        columns={columns}
        dragSort={{
          rowKey: "id",
          onDragSortEnd: (newData) => setOrder(newData.map((d) => d.title)),
        }}
        pagination={{ pageSizeOptions: [5, 10] }}
      />
      {order.length > 0 && (
        <p className="text-xs text-muted-foreground px-1">
          Current order: {order.join(' → ')}
        </p>
      )}
    </div>
  )
}
