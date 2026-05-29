"use client"

import type { ColumnDef, Table } from "@tanstack/react-table"

import { Badge } from "@/registry/new-york-v4/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select"
import { ProTable } from "@/registry/new-york-v4/pro/pro-table/index"

type User = {
  name: string
  email: string
  role: "admin" | "editor" | "viewer"
  status: "active" | "inactive"
}

const data: User[] = [
  { name: "Alice Wang", email: "alice@example.com", role: "admin", status: "active" },
  { name: "Bob Chen", email: "bob@example.com", role: "editor", status: "active" },
  { name: "Carol Liu", email: "carol@example.com", role: "viewer", status: "inactive" },
  { name: "David Zhang", email: "david@example.com", role: "editor", status: "active" },
  { name: "Eve Lin", email: "eve@example.com", role: "admin", status: "inactive" },
  { name: "Frank Wu", email: "frank@example.com", role: "viewer", status: "active" },
]

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name", meta: { pinned: "left" } },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <Badge variant="outline">{row.getValue("role")}</Badge>,
    filterFn: "equals",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const active = row.getValue("status") === "active"
      return (
        <Badge variant={active ? "default" : "secondary"}>
          {row.getValue("status")}
        </Badge>
      )
    },
    filterFn: "equals",
  },
]

function FilterControls({ table }: { table: Table<User> }) {
  const roleValue = (table.getColumn("role")?.getFilterValue() as string) ?? ""
  const statusValue = (table.getColumn("status")?.getFilterValue() as string) ?? ""

  return (
    <div className="flex gap-2">
      <Select
        value={roleValue || "all"}
        onValueChange={(v) =>
          table.getColumn("role")?.setFilterValue(v === "all" ? undefined : v)
        }
      >
        <SelectTrigger className="h-8 w-[120px]">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All roles</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="editor">Editor</SelectItem>
          <SelectItem value="viewer">Viewer</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={statusValue || "all"}
        onValueChange={(v) =>
          table.getColumn("status")?.setFilterValue(v === "all" ? undefined : v)
        }
      >
        <SelectTrigger className="h-8 w-[120px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default function ProTableFilterDemo() {
  return (
    <div className="h-[460px] w-full p-4">
      <ProTable
        columns={columns}
        data={data}
        searchKey="name"
        searchPlaceholder="Search by name..."
        header={<h3 className="text-base font-semibold">Team members</h3>}
        pageSizeOptions={[6, 10]}
        filterRender={(table) => <FilterControls table={table as Table<User>} />}
      />
    </div>
  )
}
