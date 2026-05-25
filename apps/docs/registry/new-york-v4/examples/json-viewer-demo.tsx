'use client'

import { CodeViewer } from '@/registry/new-york-v4/pro/pro-viewer/code'

const SAMPLE_DATA = {
  name: 'shadcn-pro',
  version: '1.0.0',
  description: 'Pro components for shadcn/ui',
  stats: {
    components: 20,
    downloads: 4832,
    stars: 312,
    forks: 41,
  },
  tags: ['react', 'shadcn', 'tailwind', 'typescript'],
  author: {
    name: 'draco-china',
    url: 'https://github.com/draco-china',
    verified: true,
  },
  dependencies: {
    react: '^18.3.0',
    'react-dom': '^18.3.0',
    shiki: '^3.0.0',
    diff: '^9.0.0',
  },
  license: 'MIT',
  published: true,
}

export default function JsonViewerDemo() {
  return (
    <div className="w-full p-4">
      <CodeViewer
        code={JSON.stringify(SAMPLE_DATA, null, 2)}
        lang="json"
        title="package.json"
        showLineNumbers
      />
    </div>
  )
}
