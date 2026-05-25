import { BlockViewer } from '@/components/block-viewer'
import { buildCategory } from '@/lib/blocks-data'

export const dynamic = 'force-static'
export const revalidate = false

export async function CategoryPageContent({ categoryId }: { categoryId: string }) {
  const cat = await buildCategory(categoryId)
  if (!cat) return null

  return (
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
  )
}
