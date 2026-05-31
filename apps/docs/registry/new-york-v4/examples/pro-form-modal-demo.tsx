'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ModalForm } from '@/registry/new-york-v4/pro/pro-form/index'

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Name',
      required: true,
      'x-component-props': { placeholder: 'Full name' },
    },
    email: {
      type: 'string',
      title: 'Email',
      required: true,
      'x-validator': 'email',
      'x-component-props': { placeholder: 'user@example.com' },
    },
    role: {
      type: 'string',
      title: 'Role',
      required: true,
      enum: [
        { label: 'Admin', value: 'admin' },
        { label: 'Developer', value: 'developer' },
        { label: 'Viewer', value: 'viewer' },
      ],
      'x-component-props': {
        placeholder: 'Select a role',
      },
    },
    active: {
      type: 'boolean',
      title: 'Active',
      default: true,
    },
  },
}

export default function ProFormModalDemo() {
  const [result, setResult] = useState<Record<string, unknown> | null>(null)

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <ModalForm
        trigger={<Button>New Member</Button>}
        title="Add Team Member"
        description="Fill in the details below to add a new team member."
        submitter={{ submit: { text: "Add Member" } }}
        schema={schema}
        onFinish={async (values) => {
          await new Promise((r) => setTimeout(r, 800))
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
