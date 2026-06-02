"use client"

import { AtSign, Search } from "lucide-react"
import { useState } from "react"
import { Input } from "@/registry/new-york-v4/pro/base/fields/input"
import { Password } from "@/registry/new-york-v4/pro/base/fields/password"

export default function ProInputDemo() {
  const [domain, setDomain] = useState("https://example.com")

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 p-4">
      <Input prefix={<Search size={16} />} placeholder="Search..." allowClear />
      <Input prefix="https://" suffix=".com" placeholder="your-domain" />
      <Input
        value={domain}
        onChange={(event) => setDomain(event.target.value)}
        prefix={{
          defaultValue: "https://",
          ariaLabel: "Protocol",
          format: (value, option) =>
            value.startsWith(option.value)
              ? value.slice(option.value.length)
              : value,
          parse: (value, option) => option.value + value.replace(/^https?:\/\//, ""),
          options: [
            { label: "https://", value: "https://" },
            { label: "http://", value: "http://" },
          ],
        }}
        suffix={{
          defaultValue: ".com",
          ariaLabel: "Domain suffix",
          format: (value, option) =>
            value.toLowerCase().endsWith(option.value)
              ? value.slice(0, -option.value.length)
              : value,
          parse: (value, option) => value.replace(/\.(com|cn|io)$/i, "") + option.value,
          options: [
            { label: ".com", value: ".com" },
            { label: ".cn", value: ".cn" },
            { label: ".io", value: ".io" },
          ],
        }}
        placeholder="your-domain"
        allowClear
      />
      <Input prefix={<AtSign size={16} />} placeholder="Email address" allowClear />
      <Password placeholder="Enter password" />
    </div>
  )
}
