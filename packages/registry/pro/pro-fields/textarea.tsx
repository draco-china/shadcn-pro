'use client'

import type * as React from 'react'
import { Textarea } from '@/components/ui/textarea'

export type TextareaBaseProps = React.ComponentProps<typeof Textarea>

export function TextareaBase(props: TextareaBaseProps) {
  return <Textarea {...props} />
}

TextareaBase.displayName = 'TextareaBase'
