"use client"

import { RefreshCw } from "lucide-react"

import { CopyButton } from "@/registry/new-york-v4/pro/base/button/copy"
import { FullscreenButton } from "@/registry/new-york-v4/pro/base/button/fullscreen"
import { RefreshButton } from "@/registry/new-york-v4/pro/base/button/refresh"

export default function ProBaseDemo() {
  return (
    <div className="flex items-center gap-2 rounded-lg border p-4">
      <RefreshButton
        tooltip="Refresh"
        variant="outline"
        onClick={() => {}}
      >
        Refresh
      </RefreshButton>
      <CopyButton
        prefix={<RefreshCw className="size-4" />}
        tooltip="Copy"
        variant="outline"
        copy={{
          text: "https://shadcn-pro.draco.run",
          success: "Copied",
        }}
      >
        Copy
      </CopyButton>
      <FullscreenButton fullscreen={{ value: false }} />
    </div>
  )
}
