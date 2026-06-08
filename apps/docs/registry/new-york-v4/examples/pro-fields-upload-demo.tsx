"use client"

import { FormItem } from "@/registry/new-york-v4/pro/form"
import {
  Upload,
  UploadTrigger,
  UploadFileList,
} from "@/registry/new-york-v4/pro/base/fields/upload"

export default function ProFieldsUploadDemo() {
  return (
    <div className="w-full max-w-sm space-y-6 p-4">
      <FormItem label="Avatar">
        <Upload accept="image/*" maxCount={1}>
          <UploadTrigger />
          <UploadFileList />
        </Upload>
      </FormItem>
      <FormItem label="Attachments">
        <Upload multiple maxCount={3}>
          <UploadTrigger />
          <UploadFileList />
        </Upload>
      </FormItem>
    </div>
  )
}
