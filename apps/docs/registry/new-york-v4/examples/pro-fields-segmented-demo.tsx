"use client"

import { createForm } from "@formily/core"
import { Field, FormProvider } from "@formily/react"

import { FormItem } from "@/registry/new-york-v4/pro/pro-form/form-item"
import { FormilySegmented } from "@/registry/new-york-v4/pro/pro-form/formily-fields"

const form = createForm()

export default function ProFieldsSegmentedDemo() {
  return (
    <FormProvider form={form}>
      <div className="w-full max-w-sm space-y-6 p-4">
        <Field
          name="view"
          title="View"
          initialValue="list"
          decorator={[FormItem]}
          component={[
            FormilySegmented,
            {
              options: [
                { label: "List", value: "list" },
                { label: "Board", value: "board" },
                { label: "Calendar", value: "calendar" },
              ],
            },
          ]}
        />
        <Field
          name="size"
          title="Size"
          initialValue="md"
          decorator={[FormItem]}
          component={[
            FormilySegmented,
            {
              options: [
                { label: "S", value: "sm" },
                { label: "M", value: "md" },
                { label: "L", value: "lg" },
                { label: "XL", value: "xl", disabled: true },
              ],
            },
          ]}
        />
      </div>
    </FormProvider>
  )
}
