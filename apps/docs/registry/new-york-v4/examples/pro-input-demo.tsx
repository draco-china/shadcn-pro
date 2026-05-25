"use client"

import { AtSign, Search } from "lucide-react"
import { Input as ProInput } from "@/registry/new-york-v4/pro/pro-fields/input"
import { Password } from "@/registry/new-york-v4/pro/pro-fields/password"

export default function ProInputDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4 p-4">
      <ProInput prefix={<Search size={16} />} placeholder="Search..." allowClear />
      <ProInput prefix="https://" suffix=".com" placeholder="your-domain" />
      <ProInput prefix={<AtSign size={16} />} placeholder="Email address" allowClear />
      <Password placeholder="Enter password" />
    </div>
  )
}
