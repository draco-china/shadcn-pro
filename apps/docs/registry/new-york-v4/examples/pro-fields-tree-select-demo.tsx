"use client"

import { FormItem } from "@/registry/new-york-v4/pro/form"
import { TreeSelect } from "@/registry/new-york-v4/pro/base/fields/select"

const options = [
  {
    label: "Engineering",
    value: "eng",
    children: [
      { label: "Frontend", value: "fe" },
      { label: "Backend", value: "be" },
    ],
  },
  {
    label: "Product",
    value: "product",
    children: [
      { label: "Design", value: "design" },
      { label: "Research", value: "research" },
    ],
  },
]

export default function ProFieldsTreeSelectDemo() {
  return (
    <div className="w-full max-w-sm space-y-6 p-4">
      <FormItem label="Team">
        <TreeSelect name="team" placeholder="Select a team" options={options} />
      </FormItem>
      <FormItem label="Teams">
        <TreeSelect name="teams" placeholder="Select teams" options={options} multiple />
      </FormItem>
    </div>
  )
}
