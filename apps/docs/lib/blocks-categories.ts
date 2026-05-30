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

const proTableFiles = [
  'index.tsx',
  'types.ts',
  'table/utils.ts',
  'table/empty-state.tsx',
  'table/skeleton.tsx',
  'table/sortable-row.tsx',
  'table/header.tsx',
  'table/body.tsx',
  'columns.tsx',
  'toolbar/index.tsx',
  'toolbar/column-settings.tsx',
  'toolbar/bulk-actions.tsx',
  'toolbar/search-form.tsx',
  'pagination/index.tsx',
  'pagination/utils.ts',
  'use-pro-table-url-state.ts',
]

const proFormFiles = [
  'index.tsx',
  'layout.tsx',
  'form-item.tsx',
  'overlay-form.tsx',
  'formily-fields/index.tsx',
  'formily-fields/utils.ts',
  'formily-fields/text.tsx',
  'formily-fields/choice.tsx',
  'formily-fields/date.tsx',
  'formily-fields/numeric.tsx',
  'formily-fields/advanced.tsx',
  'formily-fields/schema.tsx',
]

const proEditorFiles = [
  'index.tsx',
  'toolbar/index.tsx',
  'preview/scroll-sync.ts',
  'preview/styles.ts',
  'language/index.ts',
  'types.ts',
  'monaco/index.ts',
]

const codeViewerFiles = [
  'code/index.tsx',
  'code/header.tsx',
  'code/table.tsx',
  'code/lines.ts',
  'code/syntax.ts',
]

const markdownViewerFiles = ['markdown/index.tsx', ...codeViewerFiles]

const imageViewerFiles = [
  'image/index.tsx',
  'image/state.ts',
  'image/toolbar.tsx',
  'image/thumbnails.tsx',
]

const diffViewerFiles = ['diff/index.tsx', 'diff/table.tsx', 'diff/utils.ts', 'code/syntax.ts']

const htmlViewerFiles = ['html/index.tsx']

export const CATEGORIES: Category[] = [
  {
    id: 'pro-table',
    label: 'ProTable',
    blocks: [
      {
        name: 'pro-table-demo',
        description: 'Full-featured data table with filtering, sorting, and pagination.',
        iframeHeight: '676px',
        files: [demoFile('pro-table-demo'), ...componentFiles('pro-table', proTableFiles)],
      },

      {
        name: 'pro-table-drag-sort-demo',
        description: 'Drag-and-drop row reordering with dnd-kit.',
        iframeHeight: '536px',
        files: [
          demoFile('pro-table-drag-sort-demo'),
          ...componentFiles('pro-table', proTableFiles),
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
        files: [demoFile('pro-form-demo'), ...componentFiles('pro-form', proFormFiles)],
      },
      {
        name: 'pro-form-linkage-demo',
        description: 'Dynamic field linkage — show/hide/disable based on other values.',
        iframeHeight: '481px',
        files: [demoFile('pro-form-linkage-demo'), ...componentFiles('pro-form', proFormFiles)],
      },
      {
        name: 'pro-form-validation-demo',
        description: 'Built-in Zod validation with real-time error messages.',
        iframeHeight: '500px',
        files: [demoFile('pro-form-validation-demo'), ...componentFiles('pro-form', proFormFiles)],
      },
      {
        name: 'pro-form-modal-demo',
        description: 'ModalForm — schema-driven form inside a Dialog, closes on successful submit.',
        iframeHeight: '480px',
        files: [demoFile('pro-form-modal-demo'), ...componentFiles('pro-form', proFormFiles)],
      },
      {
        name: 'pro-form-drawer-demo',
        description:
          'DrawerForm — schema-driven form inside a Drawer panel, closes on successful submit.',
        iframeHeight: '480px',
        files: [demoFile('pro-form-drawer-demo'), ...componentFiles('pro-form', proFormFiles)],
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
          ...componentFiles('pro-descriptions', ['index.tsx']),
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
        files: [demoFile('pro-editor-demo'), ...componentFiles('pro-editor', proEditorFiles)],
      },
      {
        name: 'pro-editor-monaco-demo',
        description: 'Edit-only Monaco editor without a preview renderer or preview mode controls.',
        iframeHeight: '430px',
        files: [
          demoFile('pro-editor-monaco-demo'),
          ...componentFiles('pro-editor', proEditorFiles),
        ],
      },
      {
        name: 'pro-editor-markdown-demo',
        description: 'Markdown mode with full GFM syntax highlighting powered by Monaco.',
        iframeHeight: '490px',
        files: [
          demoFile('pro-editor-markdown-demo'),
          ...componentFiles('pro-editor', proEditorFiles),
          ...componentFiles('pro-viewer', markdownViewerFiles),
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
        files: [
          demoFile('markdown-viewer-demo'),
          ...componentFiles('pro-viewer', markdownViewerFiles),
        ],
      },
      {
        name: 'code-viewer-demo',
        description: 'Syntax-highlighted code viewer with copy button.',
        iframeHeight: '775px',
        files: [demoFile('code-viewer-demo'), ...componentFiles('pro-viewer', codeViewerFiles)],
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
        files: [demoFile('image-viewer-demo'), ...componentFiles('pro-viewer', imageViewerFiles)],
      },
      {
        name: 'diff-viewer-demo',
        description: 'Side-by-side diff viewer with line-level highlighting.',
        iframeHeight: '766px',
        files: [demoFile('diff-viewer-demo'), ...componentFiles('pro-viewer', diffViewerFiles)],
      },
      {
        name: 'html-viewer-demo',
        description: 'Sandboxed HTML preview surface for rendering raw HTML snippets.',
        iframeHeight: '360px',
        files: [demoFile('html-viewer-demo'), ...componentFiles('pro-viewer', htmlViewerFiles)],
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
        files: [
          demoFile('pro-fields-demo'),
          ...componentFiles('pro-fields', [
            'input.tsx',
            'select.tsx',
            'checkbox.tsx',
            'switch.tsx',
            'textarea.tsx',
            'radio.tsx',
            'date-picker.tsx',
            'faceted-filter.tsx',
          ]),
        ],
      },
      {
        name: 'pro-input-demo',
        description: 'Enhanced input with prefix, suffix, clear, and character count.',
        iframeHeight: '264px',
        files: [
          demoFile('pro-input-demo'),
          ...componentFiles('pro-fields', ['input.tsx', 'password.tsx']),
        ],
      },
      {
        name: 'pro-fields-slider-demo',
        description: 'Slider field with min/max, step, and value display.',
        iframeHeight: '240px',
        files: [
          demoFile('pro-fields-slider-demo'),
          ...componentFiles('pro-fields', ['slider.tsx']),
        ],
      },
      {
        name: 'pro-fields-rate-demo',
        description: 'Star rating field with half-star support.',
        iframeHeight: '252px',
        files: [demoFile('pro-fields-rate-demo'), ...componentFiles('pro-fields', ['rate.tsx'])],
      },
      {
        name: 'pro-fields-segmented-demo',
        description: 'Segmented control for mutually exclusive options.',
        iframeHeight: '212px',
        files: [
          demoFile('pro-fields-segmented-demo'),
          ...componentFiles('pro-fields', ['segmented.tsx']),
        ],
      },
      {
        name: 'pro-fields-faceted-filter-demo',
        description: 'Faceted filter with single-select, multi-select, and facet counts.',
        iframeHeight: '224px',
        files: [
          demoFile('pro-fields-faceted-filter-demo'),
          ...componentFiles('pro-fields', ['faceted-filter.tsx']),
        ],
      },
      {
        name: 'pro-fields-cascader-demo',
        description: 'Multi-level cascader select for hierarchical data.',
        iframeHeight: '128px',
        files: [
          demoFile('pro-fields-cascader-demo'),
          ...componentFiles('pro-fields', ['cascader.tsx']),
        ],
      },
      {
        name: 'pro-fields-tree-select-demo',
        description: 'Tree-structured select with search and multi-select.',
        iframeHeight: '208px',
        files: [
          demoFile('pro-fields-tree-select-demo'),
          ...componentFiles('pro-fields', ['tree-select.tsx']),
        ],
      },
      {
        name: 'pro-fields-upload-demo',
        description: 'File upload field with drag-and-drop and preview.',
        iframeHeight: '352px',
        files: [
          demoFile('pro-fields-upload-demo'),
          ...componentFiles('pro-fields', ['upload.tsx']),
        ],
      },
      {
        name: 'pro-fields-captcha-demo',
        description: 'Captcha input with countdown send button.',
        iframeHeight: '128px',
        files: [
          demoFile('pro-fields-captcha-demo'),
          ...componentFiles('pro-fields', ['captcha.tsx']),
        ],
      },
      {
        name: 'pro-fields-money-demo',
        description: 'Money input with currency symbol and locale formatting.',
        iframeHeight: '288px',
        files: [
          demoFile('pro-fields-money-demo'),
          ...componentFiles('pro-fields', ['money.tsx', 'input.tsx']),
        ],
      },
    ],
  },
]
