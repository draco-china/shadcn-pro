"use client"

import { Password } from "@/registry/new-york-v4/pro/pro-fields/password"

export default function ProFieldsPasswordDemo() {
  return (
    <div className="w-full max-w-sm p-4">
      <Password placeholder="Enter password" />
    </div>
  )
}
