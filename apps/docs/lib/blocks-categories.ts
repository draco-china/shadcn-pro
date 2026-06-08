export type BlockFile = {
  /** Relative path shown in file tree, e.g. "pro-table/index.tsx" */
  target: string
  /** Absolute path on disk (resolved in generate script) */
  src: string
}

export type BlockDef = {
  name: string
  description: string
  iframeHeight?: string
  /** Source files to show in code panel (demo + component files) */
  files: BlockFile[]
}

export type Category = {
  id: string
  label: string
  blocks: BlockDef[]
}

// Helper to expand component files
function componentFiles(componentDir: string, fileNames: string[]): BlockFile[] {
  return fileNames.map((f) => ({
    target: `${componentDir}/${f}`,
    src: `../../packages/registry/pro/${componentDir}/${f}`,
  }))
}

function demoFile(name: string): BlockFile {
  return {
    target: `examples/${name}.tsx`,
    src: `registry/new-york-v4/examples/${name}.tsx`,
  }
}

const codeViewerFiles = ['code/index.tsx']

const markdownViewerFiles = ['markdown/index.tsx', ...codeViewerFiles]

const inputFieldFiles = ['shared/field.tsx', 'input/index.tsx']
const selectFieldFiles = ['shared/field.tsx', 'select/index.tsx']
const proFieldFiles = [
  'shared/field.tsx',
  'shared/calendar.tsx',
  'input/index.tsx',
  'select/index.tsx',
  'checkbox/index.tsx',
  'radio/index.tsx',
  'date-picker/index.tsx',
  'date-time-picker/index.tsx',
  'upload/index.tsx',
  'array-field/index.tsx',
]

export const CATEGORIES: Category[] = [
  {
    id: 'pro-base',
    label: 'ProBase',
    blocks: [
      {
        name: 'pro-base-demo',
        description: 'Shared primitives for button, copy feedback, loading, and fullscreen state.',
        iframeHeight: '240px',
        files: [
          demoFile('pro-base-demo'),
          ...componentFiles('base', ['hooks/use-fullscreen.ts', 'button/index.tsx']),
        ],
      },
    ],
  },
  {
    id: 'pro-table',
    label: 'ProTable',
    blocks: [
      {
        name: 'pro-table-demo',
        description: 'Full-featured data table with filtering, sorting, and pagination.',
        iframeHeight: '676px',
        files: [
          demoFile('pro-table-demo'),
          ...componentFiles('table', ['index.tsx']),
          ...componentFiles('pagination', ['index.tsx']),
        ],
      },

      {
        name: 'pro-table-drag-sort-demo',
        description: 'Drag-and-drop row reordering with dnd-kit.',
        iframeHeight: '536px',
        files: [
          demoFile('pro-table-drag-sort-demo'),
          ...componentFiles('table', ['index.tsx']),
          ...componentFiles('pagination', ['index.tsx']),
        ],
      },
    ],
  },
  {
    id: 'pro-list',
    label: 'ProList',
    blocks: [
      {
        name: 'pro-list-demo',
        description: 'Data list with search, filters, custom item rendering, and pagination.',
        iframeHeight: '560px',
        files: [
          demoFile('pro-list-demo'),
          ...componentFiles('list', ['index.tsx']),
          ...componentFiles('pagination', ['index.tsx']),
        ],
      },
    ],
  },
  {
    id: 'pro-form',
    label: 'ProForm',
    blocks: [
      {
        name: 'pro-form-demo',
        description: 'Schema-driven form builder with submit actions.',
        iframeHeight: '537px',
        files: [
          demoFile('pro-form-demo'),
          ...componentFiles('form', ['index.tsx']),
          ...componentFiles('overlay', ['index.tsx']),
        ],
      },
      {
        name: 'pro-form-linkage-demo',
        description: 'Dynamic field linkage — show/hide/disable based on other values.',
        iframeHeight: '481px',
        files: [
          demoFile('pro-form-linkage-demo'),
          ...componentFiles('form', ['index.tsx']),
          ...componentFiles('overlay', ['index.tsx']),
        ],
      },
      {
        name: 'pro-form-validation-demo',
        description:
          'Schema validation with native rules, optional Zod validators, and real-time error messages.',
        iframeHeight: '500px',
        files: [
          demoFile('pro-form-validation-demo'),
          ...componentFiles('form', ['index.tsx']),
          ...componentFiles('overlay', ['index.tsx']),
        ],
      },
      {
        name: 'pro-form-modal-demo',
        description: 'ModalForm — composed form inside a Dialog, closes on successful submit.',
        iframeHeight: '480px',
        files: [
          demoFile('pro-form-modal-demo'),
          ...componentFiles('form', ['index.tsx']),
          ...componentFiles('overlay', ['index.tsx']),
        ],
      },
      {
        name: 'pro-form-drawer-demo',
        description:
          'DrawerForm — composed form inside a Drawer panel, closes on successful submit.',
        iframeHeight: '480px',
        files: [
          demoFile('pro-form-drawer-demo'),
          ...componentFiles('form', ['index.tsx']),
          ...componentFiles('overlay', ['index.tsx']),
        ],
      },
    ],
  },
  {
    id: 'pro-overlay',
    label: 'ProOverlay',
    blocks: [
      {
        name: 'pro-overlay-demo',
        description: 'Reusable modal, drawer, and confirm shells.',
        iframeHeight: '280px',
        files: [demoFile('pro-overlay-demo'), ...componentFiles('overlay', ['index.tsx'])],
      },
    ],
  },
  {
    id: 'pro-descriptions',
    label: 'ProDescriptions',
    blocks: [
      {
        name: 'pro-descriptions-demo',
        description: 'Structured key-value descriptions with inline view/edit mode switching.',
        iframeHeight: '336px',
        files: [
          demoFile('pro-descriptions-demo'),
          ...componentFiles('descriptions', ['index.tsx']),
        ],
      },
    ],
  },
  {
    id: 'pro-editor',
    label: 'ProEditor',
    blocks: [
      {
        name: 'pro-editor-demo',
        description:
          'Monaco-powered code editor with externally controlled language, syntax theme, format, and live preview.',
        iframeHeight: '490px',
        files: [demoFile('pro-editor-demo'), ...componentFiles('editor', ['index.tsx'])],
      },
      {
        name: 'pro-editor-monaco-demo',
        description: 'Edit-only Monaco editor without a preview renderer or preview mode controls.',
        iframeHeight: '430px',
        files: [demoFile('pro-editor-monaco-demo'), ...componentFiles('editor', ['index.tsx'])],
      },
      {
        name: 'pro-editor-markdown-demo',
        description: 'Markdown mode with full GFM syntax highlighting powered by Monaco.',
        iframeHeight: '490px',
        files: [
          demoFile('pro-editor-markdown-demo'),
          ...componentFiles('editor', ['index.tsx']),
          ...componentFiles('viewer', markdownViewerFiles),
        ],
      },
    ],
  },
  {
    id: 'pro-viewer',
    label: 'ProViewer',
    blocks: [
      {
        name: 'markdown-viewer-demo',
        description: 'Render Markdown with GFM syntax, tables, and code blocks.',
        iframeHeight: '674px',
        files: [demoFile('markdown-viewer-demo'), ...componentFiles('viewer', markdownViewerFiles)],
      },
      {
        name: 'code-viewer-demo',
        description: 'Syntax-highlighted code viewer with copy button.',
        iframeHeight: '775px',
        files: [demoFile('code-viewer-demo'), ...componentFiles('viewer', codeViewerFiles)],
      },
      {
        name: 'json-viewer-demo',
        description: 'Collapsible JSON tree viewer with search and copy.',
        iframeHeight: '719px',
        files: [demoFile('json-viewer-demo')],
      },
      {
        name: 'image-viewer-demo',
        description: 'Image viewer with zoom, pan, rotate, and fullscreen.',
        iframeHeight: '653px',
        files: [demoFile('image-viewer-demo'), ...componentFiles('viewer', ['image/index.tsx'])],
      },
      {
        name: 'diff-viewer-demo',
        description: 'Side-by-side diff viewer with line-level highlighting.',
        iframeHeight: '766px',
        files: [demoFile('diff-viewer-demo'), ...componentFiles('viewer', ['diff/index.tsx'])],
      },
      {
        name: 'html-viewer-demo',
        description: 'Sandboxed HTML preview surface for rendering raw HTML snippets.',
        iframeHeight: '360px',
        files: [demoFile('html-viewer-demo'), ...componentFiles('viewer', ['html/index.tsx'])],
      },
    ],
  },
  {
    id: 'pro-fields',
    label: 'ProFields',
    blocks: [
      {
        name: 'pro-fields-demo',
        description: 'Advanced field types: select, date, switch, and more.',
        iframeHeight: '388px',
        files: [demoFile('pro-fields-demo'), ...componentFiles('base/fields', proFieldFiles)],
      },
      {
        name: 'pro-fields-slider-demo',
        description: 'Slider field with min/max, step, and value display.',
        iframeHeight: '240px',
        files: [
          demoFile('pro-fields-slider-demo'),
          ...componentFiles('base/fields', inputFieldFiles),
        ],
      },
      {
        name: 'pro-fields-rate-demo',
        description: 'Star rating field with half-star support.',
        iframeHeight: '252px',
        files: [
          demoFile('pro-fields-rate-demo'),
          ...componentFiles('base/fields', ['radio/index.tsx']),
        ],
      },
      {
        name: 'pro-fields-segmented-demo',
        description: 'Segmented control for mutually exclusive options.',
        iframeHeight: '212px',
        files: [
          demoFile('pro-fields-segmented-demo'),
          ...componentFiles('base/fields', ['radio/index.tsx']),
        ],
      },
      {
        name: 'pro-fields-cascader-demo',
        description: 'Multi-level cascader select for hierarchical data.',
        iframeHeight: '128px',
        files: [
          demoFile('pro-fields-cascader-demo'),
          ...componentFiles('base/fields', selectFieldFiles),
        ],
      },
      {
        name: 'pro-fields-tree-select-demo',
        description: 'Tree-structured select with search and multi-select.',
        iframeHeight: '208px',
        files: [
          demoFile('pro-fields-tree-select-demo'),
          ...componentFiles('base/fields', selectFieldFiles),
        ],
      },
      {
        name: 'pro-fields-upload-demo',
        description: 'File upload field with drag-and-drop and preview.',
        iframeHeight: '352px',
        files: [
          demoFile('pro-fields-upload-demo'),
          ...componentFiles('base/fields', ['upload/index.tsx']),
        ],
      },
      {
        name: 'pro-fields-captcha-demo',
        description: 'Captcha input with countdown send button.',
        iframeHeight: '128px',
        files: [
          demoFile('pro-fields-captcha-demo'),
          ...componentFiles('base/fields', inputFieldFiles),
        ],
      },
      {
        name: 'pro-fields-money-demo',
        description: 'Money input with currency symbol and locale formatting.',
        iframeHeight: '288px',
        files: [
          demoFile('pro-fields-money-demo'),
          ...componentFiles('base/fields', inputFieldFiles),
        ],
      },
    ],
  },
]
