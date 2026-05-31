"use client"

import { Download, MoreHorizontal, Plus, RefreshCw, SlidersHorizontal } from "lucide-react"

import { ProToolbar } from "@/registry/new-york-v4/pro/pro-toolbar"
import { Input } from "@/registry/new-york-v4/ui/input"

export default function ProToolbarDemo() {
  return (
    <div className="w-full max-w-3xl rounded-lg border p-4">
      <ProToolbar
        left={{
          options: [
            {
              key: "search",
              render: () => <Input className="h-8 w-56" placeholder="Search projects..." />,
            },
          ],
        }}
        center={{
          options: [
            { key: "draft", label: "Drafts", variant: "ghost" },
            { key: "published", label: "Published", variant: "secondary" },
          ],
        }}
        right={{
          options: [
            {
              key: "refresh",
              icon: <RefreshCw size={16} />,
              tooltip: "Refresh",
              variant: "ghost",
            },
            { key: "separator", separator: true },
            {
              key: "export",
              label: "Export",
              icon: <Download size={16} />,
              variant: "outline",
            },
            {
              key: "columns",
              icon: <SlidersHorizontal size={16} />,
              tooltip: "Columns",
              variant: "ghost",
              contentClassName: "w-48 p-2",
              content: () => (
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    Name
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    Status
                  </label>
                </div>
              ),
            },
            {
              key: "more",
              icon: <MoreHorizontal size={16} />,
              tooltip: "More actions",
              variant: "ghost",
              items: [
                { key: "archive", label: "Archive" },
                { key: "duplicate", label: "Duplicate", shortcut: "⌘D" },
                { key: "delete", label: "Delete", danger: true, separator: "left" },
              ],
            },
            {
              key: "create",
              label: "Create",
              icon: <Plus size={16} />,
            },
          ],
        }}
      />
    </div>
  )
}
