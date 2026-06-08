import { lazy } from 'react'

// biome-ignore lint/suspicious/noExplicitAny: dynamic registry index
export const Index: Record<string, any> = {}

// biome-ignore lint/suspicious/noExplicitAny: dynamic registry index
export const ExamplesIndex: Record<string, Record<string, any>> = {
  'new-york-v4': {
    'pro-base-demo': {
      name: 'pro-base-demo',
      filePath: 'registry/new-york-v4/examples/pro-base-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-base-demo')),
    },
    'pro-pagination-demo': {
      name: 'pro-pagination-demo',
      filePath: 'registry/new-york-v4/examples/pro-pagination-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-pagination-demo')),
    },
    'pro-overlay-demo': {
      name: 'pro-overlay-demo',
      filePath: 'registry/new-york-v4/examples/pro-overlay-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-overlay-demo')),
    },
    'pro-fields-demo': {
      name: 'pro-fields-demo',
      filePath: 'registry/new-york-v4/examples/pro-fields-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-fields-demo')),
    },
    'pro-form-demo': {
      name: 'pro-form-demo',
      filePath: 'registry/new-york-v4/examples/pro-form-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-form-demo')),
    },
    'pro-form-modal-demo': {
      name: 'pro-form-modal-demo',
      filePath: 'registry/new-york-v4/examples/pro-form-modal-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-form-modal-demo')),
    },
    'pro-form-drawer-demo': {
      name: 'pro-form-drawer-demo',
      filePath: 'registry/new-york-v4/examples/pro-form-drawer-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-form-drawer-demo')),
    },
    'pro-form-schema-demo': {
      name: 'pro-form-schema-demo',
      filePath: 'registry/new-york-v4/examples/pro-form-schema-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-form-schema-demo')),
    },
    'pro-table-demo': {
      name: 'pro-table-demo',
      filePath: 'registry/new-york-v4/examples/pro-table-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-table-demo')),
    },
    'pro-table-docs-demo': {
      name: 'pro-table-docs-demo',
      filePath: 'registry/new-york-v4/examples/pro-table-docs-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-table-docs-demo')),
    },
    'pro-editor-demo': {
      name: 'pro-editor-demo',
      filePath: 'registry/new-york-v4/examples/pro-editor-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-editor-demo')),
    },
    'pro-editor-docs-demo': {
      name: 'pro-editor-docs-demo',
      filePath: 'registry/new-york-v4/examples/pro-editor-docs-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-editor-docs-demo')),
    },
    'pro-descriptions-demo': {
      name: 'pro-descriptions-demo',
      filePath: 'registry/new-york-v4/examples/pro-descriptions-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-descriptions-demo')),
    },
    'pro-descriptions-docs-demo': {
      name: 'pro-descriptions-docs-demo',
      filePath: 'registry/new-york-v4/examples/pro-descriptions-docs-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-descriptions-docs-demo')),
    },
    'pro-form-validation-demo': {
      name: 'pro-form-validation-demo',
      filePath: 'registry/new-york-v4/examples/pro-form-validation-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-form-validation-demo')),
    },
    'pro-form-linkage-demo': {
      name: 'pro-form-linkage-demo',
      filePath: 'registry/new-york-v4/examples/pro-form-linkage-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-form-linkage-demo')),
    },

    'pro-table-drag-sort-demo': {
      name: 'pro-table-drag-sort-demo',
      filePath: 'registry/new-york-v4/examples/pro-table-drag-sort-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-table-drag-sort-demo')),
    },
    'pro-table-filter-demo': {
      name: 'pro-table-filter-demo',
      filePath: 'registry/new-york-v4/examples/pro-table-filter-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-table-filter-demo')),
    },
    // P4 Viewer
    'image-viewer-demo': {
      name: 'image-viewer-demo',
      filePath: 'registry/new-york-v4/examples/image-viewer-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/image-viewer-demo')),
    },
    'image-viewer-docs-demo': {
      name: 'image-viewer-docs-demo',
      filePath: 'registry/new-york-v4/examples/image-viewer-docs-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/image-viewer-docs-demo')),
    },
    'code-viewer-demo': {
      name: 'code-viewer-demo',
      filePath: 'registry/new-york-v4/examples/code-viewer-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/code-viewer-demo')),
    },
    'code-viewer-docs-demo': {
      name: 'code-viewer-docs-demo',
      filePath: 'registry/new-york-v4/examples/code-viewer-docs-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/code-viewer-docs-demo')),
    },
    'diff-viewer-demo': {
      name: 'diff-viewer-demo',
      filePath: 'registry/new-york-v4/examples/diff-viewer-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/diff-viewer-demo')),
    },
    'diff-viewer-docs-demo': {
      name: 'diff-viewer-docs-demo',
      filePath: 'registry/new-york-v4/examples/diff-viewer-docs-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/diff-viewer-docs-demo')),
    },
    'html-viewer-demo': {
      name: 'html-viewer-demo',
      filePath: 'registry/new-york-v4/examples/html-viewer-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/html-viewer-demo')),
    },
    'html-viewer-docs-demo': {
      name: 'html-viewer-docs-demo',
      filePath: 'registry/new-york-v4/examples/html-viewer-docs-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/html-viewer-docs-demo')),
    },
    'markdown-viewer-demo': {
      name: 'markdown-viewer-demo',
      filePath: 'registry/new-york-v4/examples/markdown-viewer-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/markdown-viewer-demo')),
    },
    'markdown-viewer-docs-demo': {
      name: 'markdown-viewer-docs-demo',
      filePath: 'registry/new-york-v4/examples/markdown-viewer-docs-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/markdown-viewer-docs-demo')),
    },
    'json-viewer-demo': {
      name: 'json-viewer-demo',
      filePath: 'registry/new-york-v4/examples/json-viewer-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/json-viewer-demo')),
    },
    'pro-editor-monaco-demo': {
      name: 'pro-editor-monaco-demo',
      filePath: 'registry/new-york-v4/examples/pro-editor-monaco-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-editor-monaco-demo')),
    },
    'pro-editor-markdown-demo': {
      name: 'pro-editor-markdown-demo',
      filePath: 'registry/new-york-v4/examples/pro-editor-markdown-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-editor-markdown-demo')),
    },
    'pro-fields-password-demo': {
      name: 'pro-fields-password-demo',
      filePath: 'registry/new-york-v4/examples/pro-fields-password-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-fields-password-demo')),
    },
    'pro-fields-textarea-demo': {
      name: 'pro-fields-textarea-demo',
      filePath: 'registry/new-york-v4/examples/pro-fields-textarea-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-fields-textarea-demo')),
    },
    'pro-fields-digit-demo': {
      name: 'pro-fields-digit-demo',
      filePath: 'registry/new-york-v4/examples/pro-fields-digit-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-fields-digit-demo')),
    },
    'pro-fields-digit-range-demo': {
      name: 'pro-fields-digit-range-demo',
      filePath: 'registry/new-york-v4/examples/pro-fields-digit-range-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-fields-digit-range-demo')),
    },
    'pro-fields-select-demo': {
      name: 'pro-fields-select-demo',
      filePath: 'registry/new-york-v4/examples/pro-fields-select-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-fields-select-demo')),
    },
    'pro-fields-checkbox-demo': {
      name: 'pro-fields-checkbox-demo',
      filePath: 'registry/new-york-v4/examples/pro-fields-checkbox-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-fields-checkbox-demo')),
    },
    'pro-fields-switch-demo': {
      name: 'pro-fields-switch-demo',
      filePath: 'registry/new-york-v4/examples/pro-fields-switch-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-fields-switch-demo')),
    },
    'pro-fields-radio-demo': {
      name: 'pro-fields-radio-demo',
      filePath: 'registry/new-york-v4/examples/pro-fields-radio-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-fields-radio-demo')),
    },
    'pro-fields-date-picker-demo': {
      name: 'pro-fields-date-picker-demo',
      filePath: 'registry/new-york-v4/examples/pro-fields-date-picker-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-fields-date-picker-demo')),
    },
    'pro-fields-date-range-picker-demo': {
      name: 'pro-fields-date-range-picker-demo',
      filePath: 'registry/new-york-v4/examples/pro-fields-date-range-picker-demo.tsx',
      component: lazy(
        () => import('@/registry/new-york-v4/examples/pro-fields-date-range-picker-demo'),
      ),
    },
    'pro-fields-date-time-picker-demo': {
      name: 'pro-fields-date-time-picker-demo',
      filePath: 'registry/new-york-v4/examples/pro-fields-date-time-picker-demo.tsx',
      component: lazy(
        () => import('@/registry/new-york-v4/examples/pro-fields-date-time-picker-demo'),
      ),
    },
    'pro-fields-time-picker-demo': {
      name: 'pro-fields-time-picker-demo',
      filePath: 'registry/new-york-v4/examples/pro-fields-time-picker-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-fields-time-picker-demo')),
    },
    'pro-fields-slider-demo': {
      name: 'pro-fields-slider-demo',
      filePath: 'registry/new-york-v4/examples/pro-fields-slider-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-fields-slider-demo')),
    },
    'pro-fields-rate-demo': {
      name: 'pro-fields-rate-demo',
      filePath: 'registry/new-york-v4/examples/pro-fields-rate-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-fields-rate-demo')),
    },
    'pro-fields-segmented-demo': {
      name: 'pro-fields-segmented-demo',
      filePath: 'registry/new-york-v4/examples/pro-fields-segmented-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-fields-segmented-demo')),
    },
    'pro-fields-cascader-demo': {
      name: 'pro-fields-cascader-demo',
      filePath: 'registry/new-york-v4/examples/pro-fields-cascader-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-fields-cascader-demo')),
    },
    'pro-fields-tree-select-demo': {
      name: 'pro-fields-tree-select-demo',
      filePath: 'registry/new-york-v4/examples/pro-fields-tree-select-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-fields-tree-select-demo')),
    },
    'pro-fields-upload-demo': {
      name: 'pro-fields-upload-demo',
      filePath: 'registry/new-york-v4/examples/pro-fields-upload-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-fields-upload-demo')),
    },
    'pro-fields-captcha-demo': {
      name: 'pro-fields-captcha-demo',
      filePath: 'registry/new-york-v4/examples/pro-fields-captcha-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-fields-captcha-demo')),
    },
    'pro-fields-money-demo': {
      name: 'pro-fields-money-demo',
      filePath: 'registry/new-york-v4/examples/pro-fields-money-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-fields-money-demo')),
    },
    'pro-fields-array-field-demo': {
      name: 'pro-fields-array-field-demo',
      filePath: 'registry/new-york-v4/examples/pro-fields-array-field-demo.tsx',
      component: lazy(() => import('@/registry/new-york-v4/examples/pro-fields-array-field-demo')),
    },
  },
}
