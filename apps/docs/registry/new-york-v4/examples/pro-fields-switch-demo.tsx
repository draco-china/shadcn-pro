"use client"

import { useState } from "react"

import { SwitchBase } from "@/registry/new-york-v4/pro/pro-fields/switch"

export default function ProFieldsSwitchDemo() {
  const [enabled, setEnabled] = useState(true)

  return (
    <div className="w-full p-4">
      <label className="flex items-center gap-3 text-sm">
        <SwitchBase value={enabled} onChange={setEnabled} />
        Enable notifications
      </label>
    </div>
  )
}
