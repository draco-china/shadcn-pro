import type { Metadata } from 'next'
import Link from 'next/link'

import { BlocksNav } from '@/components/blocks-nav'
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Button } from '@/registry/new-york-v4/ui/button'

const title = 'Pro Components for shadcn/ui'
const description =
  'Production-ready component demos built on top of shadcn/ui. Browse variants, copy code, and use them in your apps.'

export const metadata: Metadata = { title, description }

export default function BlocksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <a href="#blocks">Browse Components</a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/docs/components/pro-table">View Components</Link>
          </Button>
        </PageActions>
      </PageHeader>

      {/* Sticky nav */}
      <div
        id="blocks"
        className="border-grid sticky top-[--header-height] z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container-wrapper">
          <div className="container flex items-center py-4">
            <BlocksNav />
          </div>
        </div>
      </div>

      <div className="container-wrapper flex-1 py-8 md:py-12">
        <div className="container">{children}</div>
      </div>
    </>
  )
}
