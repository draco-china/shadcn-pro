"use client"

import { useState } from "react"

import { ArrayField } from "@/registry/new-york-v4/pro/pro-fields/array-field"
import { Input } from "@/registry/new-york-v4/pro/pro-fields/input"

interface Contact {
  name: string
  email: string
}

export default function ProFieldsArrayFieldDemo() {
  const [value, setValue] = useState<Contact[]>([
    { name: "Alice Wang", email: "alice@example.com" },
    { name: "Bob Chen", email: "bob@example.com" },
  ])

  return (
    <div className="w-full max-w-md p-4">
      <ArrayField<Contact>
        value={value}
        onChange={setValue}
        newItem={() => ({ name: "", email: "" })}
        addText="Add contact"
        min={1}
        renderItem={(item, _index, { update }) => (
          <div className="space-y-2">
            <Input
              placeholder="Name"
              value={item.name}
              onChange={(e) => update({ name: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={item.email}
              onChange={(e) => update({ email: e.target.value })}
            />
          </div>
        )}
      />
    </div>
  )
}
