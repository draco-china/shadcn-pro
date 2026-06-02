import type { CascaderOption } from '../../base/fields/cascader'
import { getCascaderLabel as getBaseCascaderLabel } from '../../base/fields/cascader/utils'
import type { TreeSelectOption } from '../../base/fields/tree-select'
import { getTreeSelectLabels as getBaseTreeSelectLabels } from '../../base/fields/tree-select/utils'

export function getCascaderLabel(
  options: CascaderOption[] | undefined,
  path: string[] | undefined,
): string {
  return getBaseCascaderLabel(options, path)
}

export function getTreeSelectLabels(
  options: TreeSelectOption[] | undefined,
  values: string[] | undefined,
): string {
  return getBaseTreeSelectLabels(options, values)
}
