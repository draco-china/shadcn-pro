"use client"

import { createForm } from "@formily/core"
import { Field, FormProvider } from "@formily/react"

import { FormItem } from "@/registry/new-york-v4/pro/pro-form/form-item"
import { FormilyCascader } from "@/registry/new-york-v4/pro/pro-form/formily-fields"

const regionOptions = [
  {
    label: "North America",
    value: "na",
    children: [
      {
        label: "United States",
        value: "us",
        children: [
          { label: "California", value: "ca" },
          { label: "New York", value: "ny" },
          { label: "Texas", value: "tx" },
        ],
      },
      {
        label: "Canada",
        value: "ca-country",
        children: [
          { label: "Ontario", value: "on" },
          { label: "British Columbia", value: "bc" },
        ],
      },
    ],
  },
  {
    label: "Asia",
    value: "asia",
    children: [
      {
        label: "China",
        value: "cn",
        children: [
          { label: "Beijing", value: "bj" },
          { label: "Shanghai", value: "sh" },
        ],
      },
      {
        label: "Japan",
        value: "jp",
        children: [
          { label: "Tokyo", value: "tk" },
          { label: "Osaka", value: "os" },
        ],
      },
    ],
  },
]

const form = createForm()

export default function ProFieldsCascaderDemo() {
  return (
    <FormProvider form={form}>
      <div className="w-full max-w-sm space-y-6 p-4">
        <Field
          name="region"
          title="Region"
          decorator={[FormItem]}
          component={[
            FormilyCascader,
            {
              options: regionOptions,
              placeholder: "Select region",
              allowClear: true,
            },
          ]}
        />
      </div>
    </FormProvider>
  )
}
