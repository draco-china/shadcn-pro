"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/registry/new-york-v4/pro/pro-fields/input"
import { ObjectField } from "@/registry/new-york-v4/pro/pro-fields/object-field"
import { Select } from "@/registry/new-york-v4/pro/pro-fields/select"

export default function ProFieldsObjectFieldDemo() {
  return (
    <div className="w-full max-w-md space-y-6 p-4">
      {/* Default: separated variant */}
      <ObjectField
        title="Profile"
        description="Your public display information."
        action={<Button variant="ghost" size="sm" className="h-6 text-xs">Edit</Button>}
      >
        <Input placeholder="Display name" />
        <Select
          placeholder="Department"
          options={[
            { label: "Product", value: "product" },
            { label: "Engineering", value: "engineering" },
          ]}
        />
      </ObjectField>

      {/* Bordered + collapsible */}
      <ObjectField
        title="Advanced settings"
        description="Only change if you know what you're doing."
        variant="bordered"
        collapsible
        defaultOpen={false}
      >
        <Input placeholder="Custom domain" />
        <Input placeholder="Webhook URL" />
      </ObjectField>
    </div>
  )
}
