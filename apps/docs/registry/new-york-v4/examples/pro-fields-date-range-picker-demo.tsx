"use client"

import { useState } from "react"

import { DateRangePicker } from "@/registry/new-york-v4/pro/base/fields/date-picker"

type DateRangeValue = {
  from?: Date
  to?: Date
}

export default function ProFieldsDateRangePickerDemo() {
  const [value, setValue] = useState<DateRangeValue | undefined>({
    from: new Date(2026, 4, 25),
    to: new Date(2026, 4, 29),
  })

  return (
    <div className="w-full max-w-sm p-4">
      <DateRangePicker value={value} onChange={setValue} />
    </div>
  )
}
