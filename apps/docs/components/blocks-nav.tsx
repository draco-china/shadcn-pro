'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { CATEGORIES } from '@/lib/blocks-categories'
import { ScrollArea, ScrollBar } from '@/registry/new-york-v4/ui/scroll-area'

export function BlocksNav() {
  const pathname = usePathname()

  return (
    <div className="relative overflow-hidden">
      <ScrollArea className="max-w-none">
        <div className="flex items-center">
          {CATEGORIES.map((cat) => (
            <BlocksNavLink
              key={cat.id}
              label={cat.label}
              href={`/blocks/${cat.id}`}
              isActive={pathname === `/blocks/${cat.id}`}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}

function BlocksNavLink({
  label,
  href,
  isActive,
}: {
  label: string
  href: string
  isActive: boolean
}) {
  return (
    <Link
      href={href}
      className="flex h-7 items-center justify-center px-4 text-center text-base font-medium text-muted-foreground transition-colors hover:text-primary data-[active=true]:text-primary"
      data-active={isActive}
    >
      {label}
    </Link>
  )
}
