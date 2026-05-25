"use client"

import { useState } from "react"

import { SelectBase } from "@/registry/new-york-v4/pro/pro-fields/select"

export default function ProFieldsSelectDemo() {
  const [value, setValue] = useState<string | undefined>("admin")

  return (
    <div className="w-full max-w-sm p-4">
      <SelectBase
        value={value}
        onChange={setValue}
        allowClear
        options={[
          { label: "Admin", value: "admin" },
          { label: "Editor", value: "editor" },
          { label: "Viewer", value: "viewer" },
        ]}
      />
    </div>
  )
}
