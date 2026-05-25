"use client"

import { TextareaBase } from "@/registry/new-york-v4/pro/pro-fields/textarea"

export default function ProFieldsTextareaDemo() {
  return (
    <div className="w-full max-w-sm p-4">
      <TextareaBase placeholder="Write a note" rows={4} />
    </div>
  )
}
