"use client"

import type { ColumnDef } from "@tanstack/react-table"
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
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "role",
    header: "Role",
    filterFn: "multiValueFilter",
    meta: {
      filterPlaceholder: "Role",
      filters: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Viewer", value: "viewer" },
      ],
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: "equals",
    meta: {
      filterPlaceholder: "Status",
      filterVariant: "text",
      filterMode: "single",
      filters: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  },
]

export default function ProTableFilterDemo() {
  return (
    <div className="h-[460px] w-full p-4">
      <ProTable
        columns={columns}
        data={data}
        searchKey="name"
        searchPlaceholder="Search by name..."
        pageSizeOptions={[6, 10]}
      />
    </div>
  )
}
