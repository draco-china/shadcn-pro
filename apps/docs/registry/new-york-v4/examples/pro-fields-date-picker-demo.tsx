"use client"

import { useState } from "react"

import { DatePickerBase } from "@/registry/new-york-v4/pro/pro-fields/date-picker"

export default function ProFieldsDatePickerDemo() {
  const [value, setValue] = useState<Date | undefined>(
    () => new Date(2026, 4, 25)
  )

  return (
    <div className="w-full max-w-sm p-4">
      <DatePickerBase value={value} onChange={setValue} allowClear />
    </div>
  )
}
