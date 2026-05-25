"use client"

import { Search } from "lucide-react"

import { Input } from "@/registry/new-york-v4/pro/pro-fields/input"

export default function ProFieldsInputDemo() {
  return (
    <div className="w-full max-w-sm p-4">
      <Input
        prefix={<Search size={16} />}
        placeholder="Search fields..."
        allowClear
      />
    </div>
  )
}
