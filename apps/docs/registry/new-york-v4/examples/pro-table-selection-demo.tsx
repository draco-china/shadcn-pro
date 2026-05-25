'use client'

import { Download, Trash2, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import { Button } from '@/registry/new-york-v4/ui/button'
import { Checkbox } from '@/registry/new-york-v4/ui/checkbox'
import { Badge } from '@/registry/new-york-v4/ui/badge'
import { ProTable } from '@/registry/new-york-v4/pro/pro-table/index'

type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'editor'
  status: 'active' | 'inactive'
}

const INITIAL_DATA: User[] = [
  { id: '1', name: 'Alice Wang', email: 'alice@example.com', role: 'admin', status: 'active' },
  { id: '2', name: 'Bob Chen', email: 'bob@example.com', role: 'editor', status: 'active' },
  { id: '3', name: 'Carol Liu', email: 'carol@example.com', role: 'user', status: 'inactive' },
  { id: '4', name: 'David Zhang', email: 'david@example.com', role: 'user', status: 'active' },
  { id: '5', name: 'Eva Li', email: 'eva@example.com', role: 'editor', status: 'active' },
  { id: '6', name: 'Frank Wu', email: 'frank@example.com', role: 'user', status: 'inactive' },
  { id: '7', name: 'Grace Zhao', email: 'grace@example.com', role: 'admin', status: 'active' },
  { id: '8', name: 'Henry Sun', email: 'henry@example.com', role: 'editor', status: 'inactive' },
]

export default function ProTableSelectionDemo() {
  const [data, setData] = useState<User[]>(INITIAL_DATA)
  const [actionLog, setActionLog] = useState<string | null>(null)

  const columns: ColumnDef<User>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    { accessorKey: 'name', header: 'Name', enableSorting: true },
    { accessorKey: 'email', header: 'Email', enableSorting: true },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">{row.getValue('role')}</Badge>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const active = row.getValue('status') === 'active'
        return <Badge variant={active ? 'default' : 'secondary'}>{active ? 'Active' : 'Inactive'}</Badge>
      },
    },
  ]

  function getSelectedNames(table: Parameters<typeof ProTable>[0]['data']) {
    return (table as User[]).map((u) => u.name).join('、')
  }
  void getSelectedNames

  return (
    <div className="w-full space-y-3 p-4">
      {actionLog && (
        <div className="flex items-center justify-between rounded-md bg-muted px-4 py-2 text-sm text-muted-foreground">
          <span>{actionLog}</span>
          <button
            type="button"
            className="ml-2 text-xs underline"
            onClick={() => setActionLog(null)}
          >
            Dismiss
          </button>
        </div>
      )}
      <ProTable
        data={data}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search name..."
        pageSizeOptions={[5, 10]}
        toolBarRender={() => [
          <Button
            key="add"
            size="sm"
            onClick={() => {
              const newUser: User = {
                id: String(Date.now()),
                name: `New User ${data.length + 1}`,
                email: `user${data.length + 1}@example.com`,
                role: 'user',
                status: 'active',
              }
              setData((prev) => [...prev, newUser])
              setActionLog(`Added: ${newUser.name}`)
            }}
          >
            <UserPlus size={14} className="mr-1" />
            Add
          </Button>,
          <Button key="export" size="sm" variant="outline"
            onClick={() => setActionLog('Bulk export complete (simulated)')}
          >
            <Download size={14} className="mr-1" />
            Export
          </Button>,
          <Button key="delete" size="sm" variant="destructive"
            onClick={() => setActionLog('Please select rows first (ProTable built-in rowSelection)')}
          >
            <Trash2 size={14} className="mr-1" />
            Delete selected
          </Button>,
        ]}
        onRefresh={() => {
          setData(INITIAL_DATA)
          setActionLog('Data refreshed')
        }}
      />
    </div>
  )
}
