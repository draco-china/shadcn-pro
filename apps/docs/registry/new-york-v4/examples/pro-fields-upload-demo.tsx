"use client"

import { createForm } from "@formily/core"
import { Field, FormProvider } from "@formily/react"

import { FormItem } from "@/registry/new-york-v4/pro/pro-form/form-item"
import { FormilyUpload } from "@/registry/new-york-v4/pro/pro-form/formily-fields"

const form = createForm()

export default function ProFieldsUploadDemo() {
  return (
    <FormProvider form={form}>
      <div className="w-full max-w-sm space-y-6 p-4">
        <Field
          name="avatar"
          title="Avatar"
          decorator={[FormItem]}
          component={[
            FormilyUpload,
            {
              accept: "image/*",
              multiple: false,
              maxCount: 1,
              placeholder: "Click to upload image",
            },
          ]}
        />
        <Field
          name="documents"
          title="Documents"
          decorator={[FormItem]}
          component={[
            FormilyUpload,
            {
              accept: ".pdf,.doc,.docx",
              multiple: true,
              maxCount: 5,
              placeholder: "Upload up to 5 documents",
            },
          ]}
        />
      </div>
    </FormProvider>
  )
}
