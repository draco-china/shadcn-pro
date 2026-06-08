"use client"

import { FormItem } from "@/registry/new-york-v4/pro/form"
import { Captcha } from "@/registry/new-york-v4/pro/base/fields/input"

export default function ProFieldsCaptchaDemo() {
  return (
    <div className="w-full max-w-sm space-y-6 p-4">
      <FormItem label="Verification Code">
        <Captcha name="code" placeholder="Enter code" />
      </FormItem>
    </div>
  )
}
