'use client'

import type * as React from 'react'
import { Textarea as ShadcnTextarea } from '@/components/ui/textarea'

export type TextareaProps = React.ComponentProps<typeof ShadcnTextarea>

export function Textarea(props: TextareaProps) {
  return <ShadcnTextarea {...props} />
}

Textarea.displayName = 'Textarea'
