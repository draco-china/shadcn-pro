'use client'

import { Input, Password } from '@/registry/new-york-v4/pro/base/fields/input'
import { Select } from '@/registry/new-york-v4/pro/base/fields/select'
import { FormItem, ProForm } from '@/registry/new-york-v4/pro/form'

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'User', value: 'user' },
]

export default function ProFormValidationDemo() {
  async function handleFinish(values: Record<string, unknown>) {
    await new Promise((resolve) => setTimeout(resolve, 800))
    alert(`Submitted successfully:\n${JSON.stringify(values, null, 2)}`)
  }

  return (
    <div className="w-full max-w-md p-6">
      <h2 className="mb-4 text-lg font-semibold">Create Account</h2>
      <ProForm onFinish={handleFinish}>
        <FormItem label="Email" required htmlFor="email">
          <Input id="email" name="email" type="email" required placeholder="your@email.com" />
        </FormItem>
        <FormItem label="Password" required htmlFor="password">
          <Password
            id="password"
            name="password"
            required
            minLength={8}
            placeholder="At least 8 characters"
          />
        </FormItem>
        <FormItem label="Role" required htmlFor="role">
          <Select id="role" name="role" required placeholder="Select a role" options={roleOptions} />
        </FormItem>
      </ProForm>
    </div>
  )
}
