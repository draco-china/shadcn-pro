'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { PAGES_NEW } from '@/lib/docs'
import { getPagesFromFolder } from '@/lib/page-tree'
import type { source } from '@/lib/source'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/registry/new-york-v4/ui/sidebar'

const TOP_LEVEL_SECTIONS = [
  { name: 'Introduction', href: '/docs' },
  { name: 'Installation', href: '/docs/installation' },
  { name: 'Changelog', href: '/docs/changelog' },
]

export function DocsSidebar({
  tree,
  ...props
}: React.ComponentProps<typeof Sidebar> & { tree: typeof source.pageTree }) {
  const pathname = usePathname()
  const componentsFolder = tree.children.find(
    (node) => node.type === 'folder' && node.$id === 'components',
  )
  const components = componentsFolder ? getPagesFromFolder(componentsFolder, '') : []

  return (
    <Sidebar
      className="sticky top-[calc(var(--header-height)+0.6rem)] z-30 hidden h-[calc(100svh-10rem)] overscroll-none bg-transparent [--sidebar-menu-width:--spacing(56)] lg:flex"
      collapsible="none"
      {...props}
    >
      <div className="h-9" />
      <div className="absolute top-8 z-10 h-8 w-(--sidebar-menu-width) shrink-0 bg-linear-to-b from-background via-background/80 to-background/50 blur-xs" />
      <div className="absolute top-12 right-2 bottom-0 hidden h-full w-px bg-linear-to-b from-transparent via-border to-transparent lg:flex" />
      <SidebarContent className="mx-auto no-scrollbar w-(--sidebar-menu-width) overflow-x-hidden px-2">
        {/* Sections */}
        <SidebarGroup className="pt-6">
          <SidebarGroupLabel className="font-medium text-muted-foreground">
            Sections
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {TOP_LEVEL_SECTIONS.map(({ name, href }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    asChild
                    isActive={href === '/docs' ? pathname === href : pathname.startsWith(href)}
                    className="relative h-7.5 w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md data-[active=true]:border-accent data-[active=true]:bg-accent 3xl:fixed:w-full 3xl:fixed:max-w-48"
                  >
                    <Link href={href}>
                      <span className="absolute inset-0 flex w-(--sidebar-menu-width) bg-transparent" />
                      {name}
                      {PAGES_NEW.includes(href) && (
                        <span className="flex size-2 rounded-full bg-blue-500" title="New" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Components */}
        <SidebarGroup>
          <SidebarGroupLabel className="font-medium text-muted-foreground">
            Components
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {components.map(({ name, url }) => (
                <SidebarMenuItem key={url}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === url || pathname.startsWith(`${url}/`)}
                    className="relative h-7.5 w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md data-[active=true]:border-accent data-[active=true]:bg-accent 3xl:fixed:w-full 3xl:fixed:max-w-48"
                  >
                    <Link href={url}>
                      <span className="absolute inset-0 flex w-(--sidebar-menu-width) bg-transparent" />
                      {name}
                      {PAGES_NEW.includes(url) && (
                        <span className="flex size-2 rounded-full bg-blue-500" title="New" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="sticky -bottom-1 z-10 h-16 shrink-0 bg-linear-to-t from-background via-background/80 to-background/50 blur-xs" />
      </SidebarContent>
    </Sidebar>
  )
}
