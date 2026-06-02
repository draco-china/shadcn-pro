import type { Options as ReactMarkdownOptions } from 'react-markdown'
import rehypeMathjax from 'rehype-mathjax/svg'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkToc from 'remark-toc'
import { remarkGitHubAlerts } from './github-alerts'
import { remarkMathCodeBlocks } from './math-code-blocks'
import { sanitizeSchema } from './sanitize-schema'

export const markdownRemarkPlugins: ReactMarkdownOptions['remarkPlugins'] = [
  remarkGfm,
  [remarkToc, { heading: 'contents|table[ -]of[ -]contents|toc', tight: true }],
  remarkBreaks,
  remarkMath,
  remarkMathCodeBlocks,
  remarkGitHubAlerts,
]

export const markdownRehypePlugins: ReactMarkdownOptions['rehypePlugins'] = [
  rehypeRaw,
  [rehypeSanitize, sanitizeSchema],
  rehypeMathjax,
]
