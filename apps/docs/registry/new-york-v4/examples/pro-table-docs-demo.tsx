"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { ProTable } from "@/registry/new-york-v4/pro/pro-table/index"
import { Badge } from "@/registry/new-york-v4/ui/badge"

type User = {
  name: string
  email: string
  role: "admin" | "editor" | "viewer"
}

const data: User[] = [
  { name: "Alice Wang", email: "alice@example.com", role: "admin" },
  { name: "Bob Chen", email: "bob@example.com", role: "editor" },
  { name: "Carol Liu", email: "carol@example.com", role: "viewer" },
  { name: "David Zhang", email: "david@example.com", role: "editor" },
]

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    meta: { pinned: "left", search: { placeholder: "Search name..." } },
  },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <Badge variant="outline">{row.getValue("role")}</Badge>,
  },
]

export default function ProTableDocsDemo() {
  return (
    <div className="h-[420px] w-full p-4">
      <ProTable
        columns={columns}
        data={data}
        header={<h3 className="text-base font-semibold">Team members</h3>}
        pagination={{ pageSizeOptions: [4, 10] }}
      />
    </div>
  )
}
