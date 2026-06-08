"use client"

import { FormItem } from "@/registry/new-york-v4/pro/form"
import { Rate } from "@/registry/new-york-v4/pro/base/fields/radio"

export default function ProFieldsRateDemo() {
  return (
    <div className="w-full max-w-sm space-y-6 p-4">
      <FormItem label="Rating">
        <Rate name="rating" defaultValue={3} />
      </FormItem>
      <FormItem label="Difficulty">
        <Rate name="difficulty" defaultValue={4} />
      </FormItem>
      <FormItem label="Read-only">
        <Rate name="readonly" defaultValue={4} disabled />
      </FormItem>
    </div>
  )
}
