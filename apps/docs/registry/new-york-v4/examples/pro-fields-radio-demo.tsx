"use client"

import { useState } from "react"

import { Radio } from "@/registry/new-york-v4/pro/pro-fields/radio"

export default function ProFieldsRadioDemo() {
  const [value, setValue] = useState("medium")

  return (
    <div className="w-full p-4">
      <Radio
        value={value}
        onChange={setValue}
        options={[
          { label: "High", value: "high", description: "Notify immediately." },
          { label: "Medium", value: "medium", description: "Batch updates hourly." },
          { label: "Low", value: "low", description: "Only send daily summaries." },
        ]}
      />
    </div>
  )
}
