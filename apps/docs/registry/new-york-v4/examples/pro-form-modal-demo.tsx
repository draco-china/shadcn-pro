'use client'

import { useState } from 'react'
import { ProButton as Button } from '@/registry/new-york-v4/pro/base/button'
import { ModalForm } from '@/registry/new-york-v4/pro/form'

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Developer', value: 'developer' },
  { label: 'Viewer', value: 'viewer' },
]

export default function ProFormModalDemo() {
  const [result, setResult] = useState<Record<string, unknown> | null>(null)

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <ModalForm
        trigger={<Button>New Member</Button>}
        title="Add Team Member"
        description="Fill in the details below to add a new team member."
        defaultValues={{ active: true }}
        schema={[
          {
            name: 'name',
            label: 'Name',
            required: true,
            fieldProps: { placeholder: 'Full name' },
          },
          {
            name: 'email',
            label: 'Email',
            valueType: 'email',
            required: true,
            fieldProps: { placeholder: 'user@example.com' },
          },
          {
            name: 'role',
            label: 'Role',
            valueType: 'select',
            required: true,
            fieldProps: { placeholder: 'Select a role', options: roleOptions },
          },
          {
            name: 'active',
            label: 'Active',
            valueType: 'switch',
            extra: 'Enable this account immediately.',
          },
        ]}
        onFinish={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 800))
          setResult(values)
        }}
      />

      {result && (
        <div className="w-full max-w-sm rounded-md border bg-muted/40 p-4">
          <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Submitted</p>
          <pre className="text-xs">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
