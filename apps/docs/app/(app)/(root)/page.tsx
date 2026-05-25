import type { Metadata } from 'next'
import Link from 'next/link'
import { BlockViewer } from '@/components/block-viewer'
import { BlocksNav } from '@/components/blocks-nav'
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { buildCategories } from '@/lib/blocks-data'

const title = 'Pro Components for shadcn/ui'
const description =
  'Production-ready component demos built on top of shadcn/ui. Browse variants, copy code, and use them in your apps.'

export const metadata: Metadata = { title, description }
export const dynamic = 'force-static'
export const revalidate = false

export default async function HomePage() {
  const categories = await buildCategories()

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

      <div
        id="blocks"
        className="sticky top-[--header-height] z-10 border-b border-grid bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container-wrapper">
          <div className="container flex items-center py-4">
            <BlocksNav />
          </div>
        </div>
      </div>

      <div className="container-wrapper flex-1 py-8 md:py-12">
        <div className="container">
          <div className="flex flex-col gap-16 md:gap-24">
            {categories.map((cat) => (
              <section key={cat.id} id={cat.id} className="scroll-mt-28">
                <div className="mb-6 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">{cat.label}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {cat.blocks.length} variants
                    </p>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
                    <Link href={`/blocks/${cat.id}`}>View category</Link>
                  </Button>
                </div>
                <div className="flex flex-col gap-10 md:gap-14">
                  {cat.blocks.map((block) => (
                    <BlockViewer
                      key={block.name}
                      item={{
                        name: block.name,
                        description: block.description,
                        iframeHeight: block.iframeHeight,
                        installName: cat.id,
                      }}
                      tree={block.tree}
                      highlightedFiles={block.files}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
