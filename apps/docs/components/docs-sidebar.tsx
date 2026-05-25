'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { PAGES_NEW } from '@/lib/docs'
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

const COMPONENTS = [
  { name: 'ProFields', href: '/docs/components/pro-fields' },
  { name: 'ProForm', href: '/docs/components/pro-form' },
  { name: 'ProTable', href: '/docs/components/pro-table' },
  { name: 'ProEditor', href: '/docs/components/pro-editor' },
  { name: 'ProDescriptions', href: '/docs/components/pro-descriptions' },
]

export function DocsSidebar({
  tree: _tree,
  ...props
}: React.ComponentProps<typeof Sidebar> & { tree: typeof source.pageTree }) {
  const pathname = usePathname()

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
                    className="relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md data-[active=true]:border-accent data-[active=true]:bg-accent 3xl:fixed:w-full 3xl:fixed:max-w-48"
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
              {COMPONENTS.map(({ name, href }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === href || pathname.startsWith(`${href}/`)}
                    className="relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md data-[active=true]:border-accent data-[active=true]:bg-accent 3xl:fixed:w-full 3xl:fixed:max-w-48"
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

        <div className="sticky -bottom-1 z-10 h-16 shrink-0 bg-linear-to-t from-background via-background/80 to-background/50 blur-xs" />
      </SidebarContent>
    </Sidebar>
  )
}
