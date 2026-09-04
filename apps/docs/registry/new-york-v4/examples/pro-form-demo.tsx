'use client'

import { useState } from 'react'
import { ProForm } from '@/registry/new-york-v4/pro/form'

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Developer', value: 'developer' },
  { label: 'Designer', value: 'designer' },
  { label: 'Viewer', value: 'viewer' },
]

export default function ProFormDemo() {
  const [result, setResult] = useState<Record<string, unknown> | null>(null)

  async function handleFinish(values: Record<string, unknown>) {
    await new Promise((resolve) => setTimeout(resolve, 800))
    setResult(values)
  }

  return (
    <div className="w-full max-w-2xl space-y-6 p-6">
      <div>
        <h2 className="text-lg font-semibold">Team Member Registration</h2>
        <p className="text-sm text-muted-foreground">
          ProForm manages TanStack Form internally and renders fields from schema.
        </p>
      </div>

      <ProForm
        defaultValues={{ active: true }}
        onFinish={handleFinish}
        schema={[
          {
            name: 'firstName',
            label: 'First Name',
            required: true,
            fieldProps: { placeholder: 'First name' },
          },
          {
            name: 'lastName',
            label: 'Last Name',
            required: true,
            fieldProps: { placeholder: 'Last name' },
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
            name: 'bio',
            label: 'Bio',
            valueType: 'textarea',
            description: 'Shown as helper text below the field.',
            fieldProps: { placeholder: 'Tell us about yourself', rows: 3 },
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
