"use client"

import { useState } from "react"

import { TimePickerBase } from "@/registry/new-york-v4/pro/pro-fields/time-picker"

export default function ProFieldsTimePickerDemo() {
  const [value, setValue] = useState<string | undefined>("09:30:00")

  return (
    <div className="w-full p-4">
      <TimePickerBase value={value} onChange={setValue} allowClear />
    </div>
  )
}
