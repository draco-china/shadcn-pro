import { alertLabels, getAlertTypeFromValue } from './alert-style'
import type { MarkdownNode } from './types'
import { walkMarkdownNode } from './utils'

export function remarkGitHubAlerts() {
  return (tree: MarkdownNode) => {
    walkMarkdownNode(tree, (node) => {
      if (node.type !== 'blockquote') return

      const firstParagraph = node.children?.[0]
      const firstText = firstParagraph?.children?.[0]
      if (firstParagraph?.type !== 'paragraph' || firstText?.type !== 'text' || !firstText.value) {
        return
      }

      const match = firstText.value.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)]\s*\n?/i)
      if (!match) return

      const type = getAlertTypeFromValue(match[1])
      if (!type) return

      firstText.value = firstText.value.slice(match[0].length).replace(/^\s+/, '')
      node.data = {
        hName: 'div',
        hProperties: { className: `markdown-alert markdown-alert-${type}`, dataAlert: type },
      }
      node.children?.unshift({
        type: 'paragraph',
        data: {
          hName: 'div',
          hProperties: { className: `markdown-alert-title markdown-alert-title-${type}` },
        },
        children: [{ type: 'text', value: alertLabels[type] }],
      })
    })
  }
}
