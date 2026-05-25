import { BlockViewer } from '@/components/block-viewer'
import { buildCategories } from '@/lib/blocks-data'

export const dynamic = 'force-static'
export const revalidate = false

export default async function BlocksPage() {
  const categories = await buildCategories()

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {categories.map((cat) => (
        <section key={cat.id} id={cat.id} className="scroll-mt-28">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">{cat.label}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{cat.blocks.length} variants</p>
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
  )
}
