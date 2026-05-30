"use client"

import { useState } from "react"

import { DateTimePicker } from "@/registry/new-york-v4/pro/pro-fields/date-time-picker"

export default function ProFieldsDateTimePickerDemo() {
  const [value, setValue] = useState<Date | undefined>(
    () => new Date(2026, 4, 25, 9, 30)
  )

  return (
    <div className="w-full max-w-sm p-4">
      <DateTimePicker value={value} onChange={setValue} />
    </div>
  )
}
