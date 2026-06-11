'use client'

import { useState } from 'react'
import { Select } from '@/registry/new-york-v4/pro/base/fields/select'
import { ProForm } from '@/registry/new-york-v4/pro/form'

const accountTypeOptions = [
  { label: 'Personal', value: 'personal' },
  { label: 'Enterprise', value: 'enterprise' },
]

export default function ProFormLinkageDemo() {
  const [accountType, setAccountType] = useState<string>('personal')

  async function handleFinish(values: Record<string, unknown>) {
    await new Promise((resolve) => setTimeout(resolve, 600))
    alert(`Submitted successfully:\n${JSON.stringify(values, null, 2)}`)
  }

  return (
    <div className="w-full max-w-md p-6">
      <h2 className="mb-1 text-lg font-semibold">Registration Type Linkage</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Selecting an Enterprise account reveals the Company Name field.
      </p>
      <ProForm
        defaultValues={{ type: 'personal' }}
        onFinish={handleFinish}
        schema={[
          {
            name: 'type',
            label: 'Account Type',
            required: true,
            render: (field) => (
              <Select
                value={field.value as string | undefined}
                required
                placeholder="Select account type"
                options={accountTypeOptions}
                onChange={(nextValue) => {
                  field.onChange(nextValue)
                  setAccountType(typeof nextValue === 'string' ? nextValue : 'personal')
                }}
              />
            ),
          },
          {
            name: 'company',
            label: 'Company Name',
            required: accountType === 'enterprise',
            hidden: accountType !== 'enterprise',
            fieldProps: { placeholder: 'Enter full company name' },
          },
          {
            name: 'name',
            label: 'Name',
            required: true,
            fieldProps: { placeholder: 'Enter your name' },
          },
          {
            name: 'email',
            label: 'Email',
            valueType: 'email',
            required: true,
            fieldProps: { placeholder: 'your@email.com' },
          },
          {
            name: 'notifications',
            label: 'Subscribe to Email Notifications',
            valueType: 'switch',
          },
        ]}
      />
    </div>
  )
}
