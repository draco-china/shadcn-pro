'use client'

import { useState } from 'react'
import { ProSchemaForm } from '@/registry/new-york-v4/pro/form'

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
]

export default function ProFormSchemaDemo() {
  const [result, setResult] = useState<Record<string, unknown> | null>(null)

  return (
    <div className="w-full max-w-lg space-y-4 p-4">
      <ProSchemaForm
        initialValues={{ role: 'editor', active: true }}
        onFinish={async (values) => setResult(values)}
        schema={[
          {
            name: 'name',
            label: 'Name',
            required: true,
            fieldProps: { placeholder: 'Alice Wang' },
          },
          {
            name: 'email',
            label: 'Email',
            valueType: 'email',
            required: true,
            fieldProps: { placeholder: 'alice@example.com' },
          },
          {
            name: 'role',
            label: 'Role',
            valueType: 'select',
            fieldProps: { placeholder: 'Select role', options: roleOptions },
          },
          {
            name: 'active',
            label: 'Active',
            valueType: 'switch',
            extra: 'Enable this account immediately.',
          },
        ]}
      />

      {result && (
        <pre className="rounded-md bg-muted p-3 text-xs">{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  )
}
