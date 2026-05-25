"use client"

import { Input } from "@/registry/new-york-v4/pro/pro-fields/input"
import { ObjectField } from "@/registry/new-york-v4/pro/pro-fields/object-field"
import { SelectBase } from "@/registry/new-york-v4/pro/pro-fields/select"

export default function ProFieldsObjectFieldDemo() {
  return (
    <div className="w-full max-w-md p-4">
      <ObjectField title="Profile" collapsible contentClassName="space-y-3">
        <Input placeholder="Display name" />
        <SelectBase
          placeholder="Department"
          options={[
            { label: "Product", value: "product" },
            { label: "Engineering", value: "engineering" },
          ]}
        />
      </ObjectField>
    </div>
  )
}
