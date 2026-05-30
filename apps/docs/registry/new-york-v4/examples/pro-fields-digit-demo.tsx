"use client"

import { useState } from "react"

import { Digit } from "@/registry/new-york-v4/pro/pro-fields/digit"

export default function ProFieldsDigitDemo() {
  const [value, setValue] = useState<number | undefined>(12)

  return (
    <div className="w-full max-w-sm p-4">
      <Digit
        value={value}
        onChange={setValue}
        min={1}
        max={999}
        allowClear
      />
    </div>
  )
}
