import { BlockViewer } from '@/components/block-viewer'
import { CATEGORIES } from '@/lib/blocks-data'

export async function BlockPreview({ name, className }: { name: string; className?: string }) {
  let block: (typeof CATEGORIES)[number]['blocks'][number] | undefined

  for (const category of CATEGORIES) {
    block = category.blocks.find((b) => b.name === name)
    if (block) break
  }

  if (!block) {
    return (
      <div className={className}>
        <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          Block <code>{name}</code> not found.
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <BlockViewer
        item={{
          name: block.name,
          description: block.description,
          iframeHeight: block.iframeHeight,
        }}
        tree={block.tree}
        highlightedFiles={block.files}
      />
    </div>
  )
}
