"use client"

import { useState } from "react"

import { TimePicker } from "@/registry/new-york-v4/pro/pro-fields/time-picker"

export default function ProFieldsTimePickerDemo() {
  const [value, setValue] = useState<string | undefined>("09:30:00")

  return (
    <div className="w-full p-4">
      <TimePicker value={value} onChange={setValue} allowClear />
    </div>
  )
}
