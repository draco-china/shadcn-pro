"use client"

import { Maximize2, RefreshCw } from "lucide-react"

import { CopyButton, ProButton } from "@/registry/new-york-v4/pro/base/button"

export default function ProBaseDemo() {
  return (
    <div className="flex items-center gap-2 rounded-lg border p-4">
      <ProButton
        tooltip="Refresh"
        variant="outline"
        onClick={() => {}}
      >
        <RefreshCw className="size-4" />
        Refresh
      </ProButton>
      <CopyButton
        icon={<RefreshCw className="size-4" />}
        tooltip="Copy"
        variant="outline"
        copy="https://shadcn-pro.draco.run"
      >
        Copy
      </CopyButton>
      <ProButton
        tooltip="Fullscreen"
        variant="outline"
        size="icon"
      >
        <Maximize2 className="size-4" />
      </ProButton>
    </div>
  )
}
