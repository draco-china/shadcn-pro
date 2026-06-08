'use client'

import { useState } from 'react'
import { Input } from '@/registry/new-york-v4/pro/base/fields/input'
import { Select } from '@/registry/new-york-v4/pro/base/fields/select'
import { Switch } from '@/registry/new-york-v4/pro/base/fields/checkbox'
import { FormItem, ProForm } from '@/registry/new-york-v4/pro/form'

const accountTypeOptions = [
  { label: 'Personal', value: 'personal' },
  { label: 'Enterprise', value: 'enterprise' },
]

export default function ProFormLinkageDemo() {
  const [accountType, setAccountType] = useState<string | undefined>()

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
      <ProForm onFinish={handleFinish}>
        <FormItem label="Account Type" required htmlFor="type">
          <Select
            id="type"
            name="type"
            required
            placeholder="Select account type"
            options={accountTypeOptions}
            value={accountType}
            onChange={(nextValue) =>
              setAccountType(typeof nextValue === 'string' ? nextValue : undefined)
            }
          />
        </FormItem>
        {accountType === 'enterprise' && (
          <FormItem label="Company Name" required htmlFor="company">
            <Input id="company" name="company" required placeholder="Enter full company name" />
          </FormItem>
        )}
        <FormItem label="Name" required htmlFor="name">
          <Input id="name" name="name" required placeholder="Enter your name" />
        </FormItem>
        <FormItem label="Email" required htmlFor="email">
          <Input id="email" name="email" type="email" required placeholder="your@email.com" />
        </FormItem>
        <FormItem label="Subscribe to Email Notifications" htmlFor="notifications">
          <Switch id="notifications" name="notifications" value="true" />
        </FormItem>
      </ProForm>
    </div>
  )
}
