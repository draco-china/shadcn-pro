"use client"

import { useState } from "react"

import { Select } from "@/registry/new-york-v4/pro/base/fields/select"

export default function ProFieldsSelectDemo() {
  const [value, setValue] = useState<string | undefined>("admin")
  const [roles, setRoles] = useState<string[]>(["editor"])

  return (
    <div className="grid w-full max-w-sm gap-4 p-4">
      <Select
        value={value}
        onChange={(next) => setValue(typeof next === "string" ? next : undefined)}
        allowClear
        searchable
        options={[
          {
            label: "Admin",
            value: "admin",
            description: "Full access to workspace settings.",
          },
          {
            label: "Editor",
            value: "editor",
            description: "Can create and update content.",
          },
          {
            label: "Viewer",
            value: "viewer",
            description: "Read-only project access.",
          },
        ]}
      />
      <Select
        value={roles}
        onChange={(next) => setRoles(Array.isArray(next) ? next : [])}
        multiple
        searchable
        allowClear
        placeholder="Select roles"
        options={[
          {
            label: "Admin",
            value: "admin",
            description: "Full access to workspace settings.",
          },
          {
            label: "Editor",
            value: "editor",
            description: "Can create and update content.",
          },
          {
            label: "Viewer",
            value: "viewer",
            description: "Read-only project access.",
          },
        ]}
      />
    </div>
  )
}
