"use client"

import { FormItem } from "@/registry/new-york-v4/pro/form"
import { Segmented } from "@/registry/new-york-v4/pro/base/fields/radio"

const statusOptions = [
  { label: "Draft", value: "draft" },
  { label: "Published", value: "published" },
  { label: "Archived", value: "archived" },
]

const sizeOptions = [
  { label: "Small", value: "sm" },
  { label: "Medium", value: "md" },
  { label: "Large", value: "lg" },
]

export default function ProFieldsSegmentedDemo() {
  return (
    <div className="w-full max-w-sm space-y-6 p-4">
      <FormItem label="Status">
        <Segmented name="status" defaultValue="draft" options={statusOptions} />
      </FormItem>
      <FormItem label="Size">
        <Segmented name="size" defaultValue="md" options={sizeOptions} />
      </FormItem>
    </div>
  )
}
