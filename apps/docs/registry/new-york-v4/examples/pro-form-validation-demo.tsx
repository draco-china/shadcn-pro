'use client'

import { createForm } from '@formily/core'
import { useMemo } from 'react'
import {
  ProForm,
  SchemaField,
} from '@/registry/new-york-v4/pro/pro-form/index'

export default function ProFormValidationDemo() {
  const form = useMemo(
    () =>
      createForm({
        validateFirst: true,
      }),
    [],
  )

  async function handleFinish(values: Record<string, unknown>) {
    await new Promise((r) => setTimeout(r, 800))
    alert(`Submitted successfully:\n${JSON.stringify(values, null, 2)}`)
  }

  return (
    <div className="w-full max-w-md p-6">
      <h2 className="mb-4 text-lg font-semibold">Create Account</h2>
      <ProForm
        form={form}
        onFinish={handleFinish}
        submitText="Register"
        showReset
      >
        <SchemaField
          schema={{
            type: 'object',
            properties: {
              email: {
                type: 'string',
                title: 'Email',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': {
                  placeholder: 'your@email.com',
                },
                'x-validator': [
                  { required: true, message: 'Email is required' },
                  { format: 'email', message: 'Please enter a valid email address' },
                ],
              },
              password: {
                type: 'string',
                title: 'Password',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': {
                  type: 'password',
                  placeholder: 'At least 8 characters',
                },
                'x-validator': [
                  { required: true, message: 'Password is required' },
                  { min: 8, message: 'Password must be at least 8 characters' },
                ],
              },
              confirmPassword: {
                type: 'string',
                title: 'Confirm Password',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': {
                  type: 'password',
                  placeholder: 'Re-enter password',
                },
                'x-validator': [
                  { required: true, message: 'Please confirm your password' },
                  {
                    validator: (value: string, rule: unknown, ctx: { field: { query: (path: string) => { value: () => string } } }) => {
                      const pwd = ctx.field.query('password').value()
                      if (value !== pwd) return 'Passwords do not match'
                      return ''
                    },
                  },
                ],
              },
              role: {
                type: 'string',
                title: 'Role',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  placeholder: 'Select a role',
                },
                enum: [
                  { label: 'Admin', value: 'admin' },
                  { label: 'Editor', value: 'editor' },
                  { label: 'User', value: 'user' },
                ],
                'x-validator': [{ required: true, message: 'Please select a role' }],
              },
              agree: {
                type: 'boolean',
                title: 'Agree to Terms of Service',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Checkbox',
                'x-validator': [
                  {
                    validator: (value: boolean) =>
                      value ? '' : 'You must agree to the terms of service',
                  },
                ],
              },
            },
          }}
        />
      </ProForm>
    </div>
  )
}
