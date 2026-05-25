"use client"

import { useState } from "react"

import { ArrayField } from "@/registry/new-york-v4/pro/pro-fields/array-field"
import { Input } from "@/registry/new-york-v4/pro/pro-fields/input"

export default function ProFieldsArrayFieldDemo() {
  const [items, setItems] = useState([{ name: "Primary contact" }])

  return (
    <div className="w-full max-w-md p-4">
      <ArrayField
        value={items}
        addText="Add contact"
        onAdd={() =>
          setItems((current) => [...current, { name: "New contact" }])
        }
        onRemove={(index) =>
          setItems((current) => current.filter((_, i) => i !== index))
        }
        onMoveUp={(index) =>
          setItems((current) => {
            if (index === 0) return current
            const next = [...current]
            ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
            return next
          })
        }
        onMoveDown={(index) =>
          setItems((current) => {
            if (index === current.length - 1) return current
            const next = [...current]
            ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
            return next
          })
        }
        renderItem={(item) => <Input value={item.name} readOnly />}
      />
    </div>
  )
}
