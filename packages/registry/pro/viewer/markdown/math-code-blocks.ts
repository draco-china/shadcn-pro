import type { MarkdownNode } from './types'
import { walkMarkdownNode } from './utils'

export function remarkMathCodeBlocks() {
  return (tree: MarkdownNode) => {
    walkMarkdownNode(tree, (node) => {
      if (node.type !== 'code' || node.lang !== 'math') return
      node.type = 'math'
      delete node.lang
    })
  }
}
