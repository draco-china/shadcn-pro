import { CategoryPageContent } from '@/components/category-page'

export const dynamic = 'force-static'
export const revalidate = false

export default function Page() {
  return <CategoryPageContent categoryId="pro-fields" />
}
