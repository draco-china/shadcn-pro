'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ProForm } from '@/registry/new-york-v4/pro/form'

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'User', value: 'user' },
]

const formSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  role: z.string().min(1, 'Please select a role.'),
})

type FormValues = z.infer<typeof formSchema>

export default function ProFormValidationDemo() {
  async function handleFinish(values: FormValues) {
    await new Promise((resolve) => setTimeout(resolve, 800))
    alert(`Submitted successfully:\n${JSON.stringify(values, null, 2)}`)
  }

  return (
    <div className="w-full max-w-md p-6">
      <h2 className="mb-4 text-lg font-semibold">Create Account</h2>
      <ProForm<FormValues>
        defaultValues={{ email: '', password: '', role: '' }}
        onFinish={handleFinish}
        resolver={zodResolver(formSchema)}
        schema={[
          {
            name: 'email',
            label: 'Email',
            valueType: 'email',
            required: true,
            fieldProps: { placeholder: 'your@email.com' },
          },
          {
            name: 'password',
            label: 'Password',
            valueType: 'password',
            required: true,
            fieldProps: { placeholder: 'At least 8 characters' },
          },
          {
            name: 'role',
            label: 'Role',
            valueType: 'select',
            required: true,
            fieldProps: { placeholder: 'Select a role', options: roleOptions },
          },
        ]}
      />
    </div>
  )
}
