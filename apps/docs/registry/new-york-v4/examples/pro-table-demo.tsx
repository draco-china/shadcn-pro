"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { Download, Plus, Trash2 } from "lucide-react"

import { ProTable } from "@/registry/new-york-v4/pro/pro-table/index"
import { Checkbox } from "@/registry/new-york-v4/ui/checkbox"

type User = {
  id: string
  name: string
  email: string
  role: "admin" | "user" | "editor"
  status: "active" | "inactive"
  createdAt: string
}

const data: User[] = [
  {
    id: "1",
    name: "Alice Wang",
    email: "alice@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Bob Chen",
    email: "bob@example.com",
    role: "editor",
    status: "active",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Carol Liu",
    email: "carol@example.com",
    role: "user",
    status: "inactive",
    createdAt: "2024-03-10",
  },
  {
    id: "4",
    name: "David Zhang",
    email: "david@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-04-05",
  },
  {
    id: "5",
    name: "Eva Li",
    email: "eva@example.com",
    role: "editor",
    status: "active",
    createdAt: "2024-05-18",
  },
  {
    id: "6",
    name: "Frank Wu",
    email: "frank@example.com",
    role: "user",
    status: "inactive",
    createdAt: "2024-06-22",
  },
  {
    id: "7",
    name: "Grace Zhao",
    email: "grace@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-07-01",
  },
  {
    id: "8",
    name: "Henry Sun",
    email: "henry@example.com",
    role: "editor",
    status: "inactive",
    createdAt: "2024-07-10",
  },
  {
    id: "9",
    name: "Iris Tang",
    email: "iris@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-07-15",
  },
  {
    id: "10",
    name: "Jack Luo",
    email: "jack@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-07-20",
  },
  {
    id: "11",
    name: "Karen Xie",
    email: "karen@example.com",
    role: "editor",
    status: "active",
    createdAt: "2024-08-01",
  },
  {
    id: "12",
    name: "Leo Huang",
    email: "leo@example.com",
    role: "user",
    status: "inactive",
    createdAt: "2024-08-05",
  },
  {
    id: "13",
    name: "Mia Feng",
    email: "mia@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-08-10",
  },
  {
    id: "14",
    name: "Nick Gao",
    email: "nick@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-08-15",
  },
  {
    id: "15",
    name: "Olivia He",
    email: "olivia@example.com",
    role: "editor",
    status: "active",
    createdAt: "2024-08-20",
  },
  {
    id: "16",
    name: "Peter Cai",
    email: "peter@example.com",
    role: "user",
    status: "inactive",
    createdAt: "2024-09-01",
  },
  {
    id: "17",
    name: "Quinn Deng",
    email: "quinn@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-09-05",
  },
  {
    id: "18",
    name: "Rachel Fu",
    email: "rachel@example.com",
    role: "editor",
    status: "active",
    createdAt: "2024-09-10",
  },
  {
    id: "19",
    name: "Steve Gu",
    email: "steve@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-09-15",
  },
  {
    id: "20",
    name: "Tina Han",
    email: "tina@example.com",
    role: "user",
    status: "inactive",
    createdAt: "2024-09-20",
  },
  {
    id: "21",
    name: "Uma Jin",
    email: "uma@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-10-01",
  },
  {
    id: "22",
    name: "Victor Kong",
    email: "victor@example.com",
    role: "editor",
    status: "active",
    createdAt: "2024-10-05",
  },
  {
    id: "23",
    name: "Wendy Lin",
    email: "wendy@example.com",
    role: "user",
    status: "inactive",
    createdAt: "2024-10-10",
  },
  {
    id: "24",
    name: "Xavier Ma",
    email: "xavier@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-10-15",
  },
  {
    id: "25",
    name: "Yuna Ni",
    email: "yuna@example.com",
    role: "editor",
    status: "active",
    createdAt: "2024-10-20",
  },
]

const columns: ColumnDef<User>[] = [
  {
    id: "select",
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
  },
  {
    accessorKey: "name",
    header: "Name",
    meta: {
      pinned: "left",
      className: "w-44",
      search: { placeholder: "Search name..." },
    },
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    meta: { className: "w-60" },
    enableSorting: true,
  },
  {
    accessorKey: "role",
    header: "Role",
    meta: {
      className: "w-32",
      filter: {
        placeholder: "Role",
        options: [
          { label: "Admin", value: "admin" },
          { label: "Editor", value: "editor" },
          { label: "User", value: "user" },
        ],
        variant: "badge" as const,
      },
    },
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: {
      className: "w-32",
      filter: {
        placeholder: "Status",
        options: [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ],
        variant: "badge" as const,
      },
    },
    enableSorting: true,
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    meta: { pinned: "right", className: "w-36" },
    enableSorting: true,
  },
]

export default function ProTableDemo() {
  return (
    <div className="size-full p-4">
      <ProTable
        data={data}
        columns={columns}
        header={({ table }) => (
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Users</h2>
              <p className="text-sm text-muted-foreground">
                Manage {table.getFilteredRowModel().rows.length} team members.
              </p>
            </div>
          </div>
        )}
        pagination={{ pageSizeOptions: [5, 10, 25] }}
        bulkToolbar={{
          entityName: "user",
          actions: [
            {
              key: "export-selected",
              label: ({ selectedRows }) => `Export ${selectedRows.length}`,
              icon: <Download size={16} />,
              tooltip: "Export selected users",
              onClick: ({ table }) => table.resetRowSelection(),
            },
            {
              key: "delete-selected",
              label: "Delete",
              icon: <Trash2 size={16} />,
              className: "h-8 text-destructive hover:text-destructive",
              tooltip: "Delete selected users",
              onClick: ({ table }) => table.resetRowSelection(),
            },
          ],
        }}
        toolbar={{
          options: {
            refresh: () => {},
          },
          actions: [
            {
              key: "add",
              label: "New",
              icon: <Plus size={16} />,
              variant: "default",
              tooltip: "Create user",
            },
            {
              key: "export",
              label: "Export",
              icon: <Download size={16} />,
              tooltip: "Export users",
            },
          ],
        }}
      />
    </div>
  )
}
