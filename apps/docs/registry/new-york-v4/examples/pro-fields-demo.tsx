'use client'

import { createForm } from '@formily/core'
import { Field, FormProvider } from '@formily/react'
import { FormItem } from '@/registry/new-york-v4/pro/pro-form/form-item'
import { FormilyInput } from '@/registry/new-york-v4/pro/pro-form/formily-fields'
import { FormilyPassword } from '@/registry/new-york-v4/pro/pro-form/formily-fields'
import { FormilySelect } from '@/registry/new-york-v4/pro/pro-form/formily-fields'
import { FormilyCheckbox } from '@/registry/new-york-v4/pro/pro-form/formily-fields'
import { FormilySwitch } from '@/registry/new-york-v4/pro/pro-form/formily-fields'
import { FormilyTextarea } from '@/registry/new-york-v4/pro/pro-form/formily-fields'
import { FormilyRadio } from '@/registry/new-york-v4/pro/pro-form/formily-fields'
import { FormilyDatePicker } from '@/registry/new-york-v4/pro/pro-form/formily-fields'

const form = createForm()

export default function ProFieldsDemo() {
  return (
    <FormProvider form={form}>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        <Field
          name="name"
          title="Input"
          decorator={[FormItem]}
          component={[FormilyInput, { placeholder: 'Enter text' }]}
        />
        <Field
          name="password"
          title="Password Input"
          decorator={[FormItem]}
          component={[FormilyPassword, { placeholder: 'Enter password' }]}
        />
        <Field
          name="bio"
          title="Textarea"
          decorator={[FormItem]}
          component={[FormilyTextarea, { placeholder: 'Enter multi-line text', rows: 3 }]}
        />
        <Field
          name="role"
          title="Select"
          decorator={[FormItem]}
          dataSource={[
            { label: 'Admin', value: 'admin' },
            { label: 'Developer', value: 'developer' },
            { label: 'Viewer', value: 'viewer' },
          ]}
          component={[FormilySelect, { placeholder: 'Select a role' }]}
        />
        <Field
          name="agree"
          title="Checkbox"
          decorator={[FormItem]}
          component={[FormilyCheckbox]}
        >
          Agree to Terms of Service
        </Field>
        <Field
          name="active"
          title="Switch"
          initialValue={true}
          decorator={[FormItem]}
          component={[FormilySwitch]}
        />
        <Field
          name="priority"
          title="Radio"
          decorator={[FormItem]}
          dataSource={[
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
          ]}
          component={[FormilyRadio]}
        />
        <Field
          name="dueDate"
          title="DatePicker"
          decorator={[FormItem]}
          component={[FormilyDatePicker, { placeholder: 'Select date', dateFormat: 'yyyy-MM-dd' }]}
        />
      </div>
    </FormProvider>
  )
}
