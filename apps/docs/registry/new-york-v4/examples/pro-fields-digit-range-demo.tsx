"use client"

import { useState } from "react"

import {
  DigitRangeBase,
  type DigitRangeValue,
} from "@/registry/new-york-v4/pro/pro-fields/digit-range"

export default function ProFieldsDigitRangeDemo() {
  const [value, setValue] = useState<DigitRangeValue | undefined>({
    min: 100,
    max: 500,
  })

  return (
    <div className="w-full max-w-sm p-4">
      <DigitRangeBase value={value} onChange={setValue} allowClear />
    </div>
  )
}
