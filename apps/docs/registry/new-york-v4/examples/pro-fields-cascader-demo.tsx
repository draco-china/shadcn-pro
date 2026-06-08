"use client"

import { FormItem } from "@/registry/new-york-v4/pro/form"
import { Cascader } from "@/registry/new-york-v4/pro/base/fields/select"

const options = [
  {
    label: "North America",
    value: "na",
    children: [
      {
        label: "United States",
        value: "us",
        children: [
          { label: "New York", value: "ny" },
          { label: "California", value: "ca" },
        ],
      },
    ],
  },
  {
    label: "Asia",
    value: "asia",
    children: [
      {
        label: "China",
        value: "cn",
        children: [
          { label: "Beijing", value: "bj" },
          { label: "Shanghai", value: "sh" },
        ],
      },
    ],
  },
]

export default function ProFieldsCascaderDemo() {
  return (
    <div className="w-full max-w-sm space-y-6 p-4">
      <FormItem label="Location">
        <Cascader name="location" placeholder="Select location" options={options} />
      </FormItem>
    </div>
  )
}
