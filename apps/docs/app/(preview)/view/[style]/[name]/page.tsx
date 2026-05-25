import { notFound } from 'next/navigation'
import { ExamplesIndex } from '@/examples/__index__'
import { getDemoComponent } from '@/lib/registry'

export function generateStaticParams() {
  const params: { style: string; name: string }[] = []
  for (const style of Object.keys(ExamplesIndex)) {
    for (const name of Object.keys(ExamplesIndex[style])) {
      params.push({ style, name })
    }
  }
  return params
}

export default async function ViewPage({
  params,
}: {
  params: Promise<{ style: string; name: string }>
}) {
  const { style, name } = await params
  const Component = getDemoComponent(name, style)

  if (!Component) {
    notFound()
  }

  return <Component />
}
