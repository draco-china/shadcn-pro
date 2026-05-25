import Link from 'next/link'
import { CommandMenuClient } from '@/components/command-menu-client'
import { GitHubLink } from '@/components/github-link'

import { Icons } from '@/components/icons'
import { MainNav } from '@/components/main-nav'
import { MobileNav } from '@/components/mobile-nav'
import { ModeSwitcher } from '@/components/mode-switcher'
import { SiteConfig } from '@/components/site-config'
import { getColors } from '@/lib/colors'
import { siteConfig } from '@/lib/config'
import { source } from '@/lib/source'
import { Separator } from '@/registry/new-york-v4/ui/separator'

export function SiteHeader() {
  const colors = getColors()
  const pageTree = source.pageTree

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container-wrapper px-6">
        <div className="flex h-(--header-height) items-center **:data-[slot=separator]:h-4!">
          <MobileNav tree={pageTree} items={siteConfig.navItems} className="flex lg:hidden" />
          <Link href="/" className="hidden size-8 items-center justify-center lg:flex">
            <Icons.logo className="size-5" />
            <span className="sr-only">{siteConfig.name}</span>
          </Link>
          <MainNav items={siteConfig.navItems} className="hidden lg:flex" />
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
              <CommandMenuClient tree={pageTree} colors={colors} navItems={siteConfig.navItems} />
            </div>
            <Separator orientation="vertical" className="ml-2 hidden lg:block" />
            <GitHubLink />
            <Separator orientation="vertical" className="hidden lg:block" />
            <SiteConfig className="hidden lg:flex" />
            <Separator orientation="vertical" />
            <ModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
