"use client"

import { RefreshCw } from "lucide-react"

import { ProButton } from "@/registry/new-york-v4/pro/pro-base"

export default function ProBaseDemo() {
  return (
    <div className="flex items-center gap-2 rounded-lg border p-4">
      <ProButton
        icon={<RefreshCw className="size-4" />}
        tooltip="Refresh"
        variant="outline"
        copy={{
          text: "https://shadcn-pro.draco.run",
          success: "Copied",
        }}
        onClick={async () => {
          await new Promise((resolve) => window.setTimeout(resolve, 800))
        }}
      >
        Refresh
      </ProButton>
    </div>
  )
}
