"use client"

import { useState } from "react"

import { CheckboxBase } from "@/registry/new-york-v4/pro/pro-fields/checkbox"

export default function ProFieldsCheckboxDemo() {
  const [checked, setChecked] = useState(true)

  return (
    <div className="w-full p-4">
      <CheckboxBase value={checked} onChange={setChecked}>
        Accept terms
      </CheckboxBase>
    </div>
  )
}
