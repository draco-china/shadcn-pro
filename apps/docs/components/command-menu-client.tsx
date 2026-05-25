'use client'

import dynamic from 'next/dynamic'
import type { ComponentProps } from 'react'
import type { CommandMenu } from '@/components/command-menu'

const CommandMenuDynamic = dynamic(
  () => import('@/components/command-menu').then((m) => m.CommandMenu),
  { ssr: false },
)

export function CommandMenuClient(props: ComponentProps<typeof CommandMenu>) {
  return <CommandMenuDynamic {...props} />
}
