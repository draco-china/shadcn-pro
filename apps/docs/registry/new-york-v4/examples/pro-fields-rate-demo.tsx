"use client"

import { createForm } from "@formily/core"
import { Field, FormProvider } from "@formily/react"

import { FormItem } from "@/registry/new-york-v4/pro/pro-form/form-item"
import { FormilyRate } from "@/registry/new-york-v4/pro/pro-form/formily-fields"

const form = createForm()

export default function ProFieldsRateDemo() {
  return (
    <FormProvider form={form}>
      <div className="w-full max-w-sm space-y-6 p-4">
        <Field
          name="rating"
          title="Rating"
          initialValue={3}
          decorator={[FormItem]}
          component={[FormilyRate, { count: 5 }]}
        />
        <Field
          name="difficulty"
          title="Difficulty (10-star)"
          initialValue={7}
          decorator={[FormItem]}
          component={[FormilyRate, { count: 10 }]}
        />
        <Field
          name="readonly"
          title="Read-only"
          initialValue={4}
          decorator={[FormItem]}
          component={[FormilyRate, { disabled: true }]}
        />
      </div>
    </FormProvider>
  )
}
