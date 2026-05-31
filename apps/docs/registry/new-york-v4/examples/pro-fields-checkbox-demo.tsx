"use client"

import { useState } from "react"

import { Checkbox } from "@/registry/new-york-v4/pro/pro-fields/checkbox"

export default function ProFieldsCheckboxDemo() {
  const [checked, setChecked] = useState(true)
  const [roles, setRoles] = useState<string[]>(["editor"])

  return (
    <div className="grid w-full gap-5 p-4">
      <Checkbox value={checked} onChange={(next) => setChecked(next === true)}>
        Accept terms
      </Checkbox>
      <Checkbox
        value={roles}
        onChange={(next) => setRoles(Array.isArray(next) ? next : [])}
        options={[
          {
            label: "Admin",
            value: "admin",
            description: "Can manage workspace settings.",
          },
          {
            label: "Editor",
            value: "editor",
            description: "Can edit shared content.",
          },
        ]}
      />
    </div>
  )
}
