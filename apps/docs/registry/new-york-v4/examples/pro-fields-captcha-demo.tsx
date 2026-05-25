"use client"

import { createForm } from "@formily/core"
import { Field, FormProvider } from "@formily/react"

import { FormItem } from "@/registry/new-york-v4/pro/pro-form/form-item"
import { FormilyCaptcha } from "@/registry/new-york-v4/pro/pro-form/formily-fields"

const form = createForm()

export default function ProFieldsCaptchaDemo() {
  return (
    <FormProvider form={form}>
      <div className="w-full max-w-sm space-y-6 p-4">
        <Field
          name="captcha"
          title="Captcha"
          decorator={[FormItem]}
          component={[
            FormilyCaptcha,
            {
              placeholder: "Enter verification code",
              buttonText: "Send code",
              countdown: 30,
              onRefresh: () => {},
            },
          ]}
        />
      </div>
    </FormProvider>
  )
}
