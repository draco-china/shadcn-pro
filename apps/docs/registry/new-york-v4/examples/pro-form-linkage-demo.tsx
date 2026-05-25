'use client'

import { createForm } from '@formily/core'
import { useField } from '@formily/react'
import { observer } from '@formily/reactive-react'
import { useMemo } from 'react'
import {
  ProForm,
  SchemaField,
} from '@/registry/new-york-v4/pro/pro-form/index'

// Enterprise-specific field: listens to the `type` field to conditionally show/hide
const CompanyField = observer(() => {
  const field = useField()
  if (field.display === 'none' || field.display === 'hidden') return null
  return null
})
CompanyField.displayName = 'CompanyField'

export default function ProFormLinkageDemo() {
  const form = useMemo(
    () =>
      createForm({
        effects() {
          // Formily reactions: use x-reactions declaratively instead of manual effects
        },
      }),
    [],
  )

  async function handleFinish(values: Record<string, unknown>) {
    await new Promise((r) => setTimeout(r, 600))
    alert(`Submitted successfully:\n${JSON.stringify(values, null, 2)}`)
  }

  return (
    <div className="w-full max-w-md p-6">
      <h2 className="mb-1 text-lg font-semibold">Registration Type Linkage</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        After selecting an "Enterprise" account, the Company Name field appears automatically (driven by Formily x-reactions)
      </p>
      <ProForm
        form={form}
        onFinish={handleFinish}
        submitText="Submit"
        showReset
      >
        <SchemaField
          schema={{
            type: 'object',
            properties: {
              type: {
                type: 'string',
                title: 'Account Type',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': { placeholder: 'Select account type' },
                enum: [
                  { label: 'Personal', value: 'personal' },
                  { label: 'Enterprise', value: 'enterprise' },
                ],
                'x-validator': [{ required: true, message: 'Please select an account type' }],
              },
              company: {
                type: 'string',
                title: 'Company Name',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: 'Enter full company name' },
                'x-validator': [{ required: true, message: 'Company name is required' }],
                'x-reactions': {
                  dependencies: ['type'],
                  fulfill: {
                    state: {
                      visible: '{{$deps[0] === "enterprise"}}',
                      required: '{{$deps[0] === "enterprise"}}',
                    },
                  },
                },
              },
              name: {
                type: 'string',
                title: 'Name',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: 'Enter your name' },
                'x-validator': [{ required: true, message: 'Name is required' }],
              },
              email: {
                type: 'string',
                title: 'Email',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: 'your@email.com' },
                'x-validator': [
                  { required: true, message: 'Email is required' },
                  { format: 'email', message: 'Please enter a valid email' },
                ],
              },
              notifications: {
                type: 'boolean',
                title: 'Subscribe to Email Notifications',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
              },
            },
          }}
        />
      </ProForm>
    </div>
  )
}
