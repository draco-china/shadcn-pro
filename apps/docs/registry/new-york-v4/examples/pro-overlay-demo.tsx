'use client'

import { useState } from 'react'
import { ProButton } from '@/registry/new-york-v4/pro/base/button'
import { ProConfirm, ProDrawer, ProModal } from '@/registry/new-york-v4/pro/overlay'

export default function ProOverlayDemo() {
  const [deleted, setDeleted] = useState(false)

  return (
    <div className="flex flex-wrap items-center gap-3 p-6">
      <ProModal trigger={<ProButton variant="outline">Open modal</ProButton>} title="Preview">
        <p className="text-sm text-muted-foreground">
          Use ProModal for ordinary dialog content without pulling in form behavior.
        </p>
      </ProModal>

      <ProDrawer
        trigger={<ProButton variant="outline">Open drawer</ProButton>}
        title="Details"
        description="Reusable drawer shell."
      >
        <div className="px-4 pb-4 text-sm text-muted-foreground">
          Place panels, filters, forms, or custom content here.
        </div>
      </ProDrawer>

      <ProConfirm
        trigger={<ProButton variant="destructive">Delete</ProButton>}
        title="Delete record?"
        description="This action cannot be undone."
        confirmText="Delete"
        onConfirm={() => setDeleted(true)}
      />

      {deleted && <span className="text-sm text-muted-foreground">Deleted</span>}
    </div>
  )
}
