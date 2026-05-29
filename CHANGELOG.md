# [1.6.0](https://github.com/draco-china/shadcn-pro/compare/v1.5.2...v1.6.0) (2026-05-29)


### Features

* **blocks:** upgrade pro-table-demo to use meta.filters + FacetedFilter auto-render ([7724ced](https://github.com/draco-china/shadcn-pro/commit/7724ced404890f16d65d0971c4c8ec3693e9590f))

## [1.5.2](https://github.com/draco-china/shadcn-pro/compare/v1.5.1...v1.5.2) (2026-05-29)


### Bug Fixes

* **pro-fields:** align FacetedFilter style with shadcn-admin (facet counts, CheckIcon, w-50, ms-auto) ([790f8c4](https://github.com/draco-china/shadcn-pro/commit/790f8c4d486d37d2ef91252fba71ab98763b7387))

## [1.5.1](https://github.com/draco-china/shadcn-pro/compare/v1.5.0...v1.5.1) (2026-05-29)


### Bug Fixes

* **ci:** biome format __index__.ts React.lazy single line ([3382639](https://github.com/draco-china/shadcn-pro/commit/3382639e3e4b589324ef5bc9da93eff9ddceb608))

# [1.5.0](https://github.com/draco-china/shadcn-pro/compare/v1.4.0...v1.5.0) (2026-05-29)


### Features

* **pro-fields:** add FacetedFilter (multi/single-select) + ProTable auto-filter integration ([3baf0fb](https://github.com/draco-china/shadcn-pro/commit/3baf0fbff010caba37a1e32ac17a1609271b1fad))

# [1.4.0](https://github.com/draco-china/shadcn-pro/compare/v1.3.0...v1.4.0) (2026-05-29)


### Features

* **pro-table:** auto filter select + cell render from meta.filters ([9110b07](https://github.com/draco-china/shadcn-pro/commit/9110b07811af509271aa93a0ba7e2e2c9f94ae6a))

# [1.3.0](https://github.com/draco-china/shadcn-pro/compare/v1.2.0...v1.3.0) (2026-05-29)


### Features

* **pro-table:** filterRender supports function (table accessor) + filter demo ([2497d65](https://github.com/draco-china/shadcn-pro/commit/2497d6510eed0d6ff28fece7aed9bd16f52b61cf))

# [1.2.0](https://github.com/draco-china/shadcn-pro/compare/v1.1.0...v1.2.0) (2026-05-29)


### Features

* **pro-table:** auto reset button when filters are active ([fdddf2e](https://github.com/draco-china/shadcn-pro/commit/fdddf2e498d7e7941481a0f1a756ffd2c7a533da))

# [1.1.0](https://github.com/draco-china/shadcn-pro/compare/v1.0.1...v1.1.0) (2026-05-29)


### Features

* **pro-table:** use Badge for selection count in bulk actions ([3e9e1d4](https://github.com/draco-china/shadcn-pro/commit/3e9e1d421b15959604fcbbb5427ac5b07720e1f7))

## [1.0.1](https://github.com/draco-china/shadcn-pro/compare/v1.0.0...v1.0.1) (2026-05-25)


### Bug Fixes

* biome format __blocks-generated__.ts and use github.token in docs workflow ([2c33a5f](https://github.com/draco-china/shadcn-pro/commit/2c33a5f862129278522e8a15441029f9fde2d042))

# 1.0.0 (2026-05-25)


### Features

* initial release ([2369338](https://github.com/draco-china/shadcn-pro/commit/2369338eb92df77c4162ceefc31cc41517627914))

# [1.16.0](https://github.com/draco-china/shadcn-pro/compare/v1.15.0...v1.16.0) (2026-05-23)


### Bug Fixes

* add generateStaticParams to view/[style]/[name] page for static export ([52689b4](https://github.com/draco-china/shadcn-pro/commit/52689b4fe5cef43e9f14d44145a5028827680ea6))
* add html-viewer-demo, fix ComponentPreviewTabs -> ComponentPreview in html-viewer.mdx ([4c12b68](https://github.com/draco-china/shadcn-pro/commit/4c12b68b15196b926849064e041de1512593166b))
* add pro-chat ui shim + fix demo import path ([b7df1ca](https://github.com/draco-china/shadcn-pro/commit/b7df1cac4479d541a98a23fc3a07e44d7ba55ca2))
* add Usage to pro-input.mdx, fix pro-fields props table, simplify richtext-toolbar-demo ([e70bd24](https://github.com/draco-china/shadcn-pro/commit/e70bd24883124fe0594c668ab0557cea3682839e))
* basePath-aware iframe src on homepage, register pro-table-drag-sort-demo ([153a3d3](https://github.com/draco-china/shadcn-pro/commit/153a3d372a611c267368f3aeb19c028603c11480))
* biome ci — suppress warnings in upstream code, merge Toolbars into Editor category ([8e9d94c](https://github.com/draco-china/shadcn-pro/commit/8e9d94cdee41da66b0c1aaa74e481cc2ab5c701a))
* biome format and lint errors in pro-chat, component-preview-tabs, variants-tab-switcher ([a28ea60](https://github.com/draco-china/shadcn-pro/commit/a28ea60a49c113ede6e5e1bc8eaa8bfb1095feb3))
* biome format errors, pro-input-demo wrong import path and Chinese placeholders ([d0ad9ef](https://github.com/draco-china/shadcn-pro/commit/d0ad9ef9931b20d56a25e481b3172ad6980b4168))
* biome lint errors in gen-docs-meta script ([9d1a8cf](https://github.com/draco-china/shadcn-pro/commit/9d1a8cfde3ff72d60c7a08f2bb402d7138262e58))
* **block-viewer:** add iframe title attributes for a11y CI ([ebed312](https://github.com/draco-china/shadcn-pro/commit/ebed312c741f258d3637c5f645292cdda6861fd6))
* **demo:** pro-editor show CodeMirror with tsx syntax highlight, install codemirror deps ([1becb27](https://github.com/draco-china/shadcn-pro/commit/1becb27d928e98b28c42ab27895e46d7d293bb83))
* **docs:** remove dot-grid background from component preview (matches shadcn/ui style) ([44f393c](https://github.com/draco-china/shadcn-pro/commit/44f393c3c6d337078e9412e3fd8de722b5ed68b1))
* form-item label → * → description icon order ([7c3c294](https://github.com/draco-china/shadcn-pro/commit/7c3c29412efcdbc6233a7bb95ff73dfa781f6530))
* **homepage:** remove duplicate markdown editor from ProEditor tab ([e3e8520](https://github.com/draco-china/shadcn-pro/commit/e3e85208fea7a8a403bc040a7249342dd0c4f577))
* **homepage:** rename ProEditor first block to Markdown editor ([3f7eca1](https://github.com/draco-china/shadcn-pro/commit/3f7eca1bab7f67c844c534883c5b4019045c439a))
* improve docs UX - nav active state, preview dot background, header blocks link ([acbdf5b](https://github.com/draco-china/shadcn-pro/commit/acbdf5b8326d0ec7754ca159feb2d7c087f51d3b))
* monaco always use one dark pro theme ([72e8043](https://github.com/draco-china/shadcn-pro/commit/72e80439a519504d0c5047128b943734349acbb0))
* move variant tabs outside container, remove border-b to match shadcn/ui blocks layout ([bc90341](https://github.com/draco-china/shadcn-pro/commit/bc90341505c79309d38040749adcdc13e07fe3c5))
* **package:** remove version field from cli and registry package.json ([3a65d7e](https://github.com/draco-china/shadcn-pro/commit/3a65d7e03f643b03221e292c0dcb64c5a6c5abc3))
* pro-editor demos hide richtext/markdown tabs (modes=['code']) ([d18de0f](https://github.com/draco-china/shadcn-pro/commit/d18de0f6cc5e966e3ae394e642b5c40473611fb2))
* pro-editor markdown preview uses MarkdownViewer (rendered), code preview uses CodeViewer ([0ec0835](https://github.com/draco-china/shadcn-pro/commit/0ec08357f1b6e95135944286dca83f8fd788516e))
* pro-editor remove richtext mode, add markdown demo, update descriptions ([962dc98](https://github.com/draco-china/shadcn-pro/commit/962dc989c8119d93a6d7923d7e23358e4253612b))
* pro-editor use codemirror directly + add markdown engine with syntax highlight ([0241e7c](https://github.com/draco-china/shadcn-pro/commit/0241e7cf95afe335e253cd7cb09f599fc4eac1d4))
* pro-editor use CodeViewer for both code+markdown preview, remove MarkdownViewer dep ([a81ef9c](https://github.com/draco-china/shadcn-pro/commit/a81ef9c27f590c0632c0f77c0eb0835f532d55ee))
* **pro-fields:** bug fixes, dedup, and consistency improvements ([bcb8626](https://github.com/draco-china/shadcn-pro/commit/bcb8626e3054ee4aba8ac233740dc7cec376f5b2))
* register all pro components in registry __index__.tsx so ComponentSource works ([5ba2392](https://github.com/draco-china/shadcn-pro/commit/5ba239290849f52ee8b807f8a5816bec2b1c1dc8))
* register pro-chat-demo in examples index ([2027570](https://github.com/draco-china/shadcn-pro/commit/20275706dff8df0624c8d301ddc0cd69b9ee8dae))
* remove separator objects from meta.json — fumadocs only accepts string[] ([2ccadab](https://github.com/draco-china/shadcn-pro/commit/2ccadab8d5bfad9420612e85214c58df47e6b786))
* remove unused EngineProps interface ([39b7ac5](https://github.com/draco-china/shadcn-pro/commit/39b7ac5a2b60f8c61572b2d790c1d9598fac6b63))
* rename Monaco import to avoid conflict with Editor export ([f92a708](https://github.com/draco-china/shadcn-pro/commit/f92a708247173624b8921e3d7f879c9f548fecd2))
* replace component-preview-tabs with shadcn/ui upstream source ([dc373f9](https://github.com/draco-china/shadcn-pro/commit/dc373f982155721e510bca64a5c1cd666e27e3c1))
* split blocks-categories (client-safe) from blocks-data (server-only fs) ([bffef48](https://github.com/draco-china/shadcn-pro/commit/bffef486c08d892347b2ea811e8099e12f4b1c36))
* static category pages + shared lib/blocks-data + category-page component ([8b51673](https://github.com/draco-china/shadcn-pro/commit/8b51673678ce32e69342fa21b19faf166e28c432))
* toolbar demos paired with real editor; form description via icon+tooltip ([baa5629](https://github.com/draco-china/shadcn-pro/commit/baa56293d43a142b23a71aa3d7f99a2dd4fb3f34))
* translate all Chinese UI text and JSDoc to English (pagination, toolbar, pro-form) ([2de69fb](https://github.com/draco-china/shadcn-pro/commit/2de69fb0859d7c1036eeb2ae853b9afa1b5bedcb))
* turbopackIgnore in read-file.ts, fix ProInput export name in demo ([961c000](https://github.com/draco-china/shadcn-pro/commit/961c0002b8b17d677d8c7da81c5d57711e27d5aa))


### Features

* add block-viewer and page-header, rewrite homepage blocks layout ([6624e68](https://github.com/draco-china/shadcn-pro/commit/6624e68528e6e0356af4ea9389bac369d7b51cbe))
* add HtmlViewer component, html lang auto-uses iframe preview in ProEditor ([04e982e](https://github.com/draco-china/shadcn-pro/commit/04e982ec23b14232eb6793db40ffd7eba5129a17))
* add ProChat component ([5f13b45](https://github.com/draco-china/shadcn-pro/commit/5f13b45c10cc230903125337eeb97d08f0f0dfd8))
* add shadcn/ui official blocks as homepage previews ([1710a28](https://github.com/draco-china/shadcn-pro/commit/1710a288f723c139422ad0d0a23d559f94bd124a))
* all pro components shown as blocks on homepage with variants, add editor engine demos ([38503a4](https://github.com/draco-china/shadcn-pro/commit/38503a4b4e7da893f675c5cbfdfd756b4b62446b))
* bare preview layout for /view, shadcn-blocks style homepage ([a935ff5](https://github.com/draco-china/shadcn-pro/commit/a935ff5b261e2f244824a96361065fde057507c6))
* block-viewer toolbar polish + ProChat sidebar and image upload + spacing fix ([d8047f7](https://github.com/draco-china/shadcn-pro/commit/d8047f77b30691d9e74ff91223191deae295756e))
* blocks category routes + toolbar open-in-new-tab + anchor links ([3097d1c](https://github.com/draco-china/shadcn-pro/commit/3097d1c2e46d6363cbfbc60f9892e69743b739b5))
* code-viewer folding + shiki diff highlighting + json-viewer reuses code-viewer ([5a86b5a](https://github.com/draco-china/shadcn-pro/commit/5a86b5a6a93c4fedb4e20bf61ddbf85a36aac95a))
* **docs:** remove Blocks nav, restructure sidebar groups, add Preview/Code tabs to ComponentPreview ([de02e4e](https://github.com/draco-china/shadcn-pro/commit/de02e4e0b42060bbf7b0723d571ad47a9703c17f))
* full BlockViewer with file tree, code panel, viewport toggle, copy CLI ([fe45458](https://github.com/draco-china/shadcn-pro/commit/fe45458151ef506b709b4438a541d1c51001bb4b))
* homepage uses BlockViewer with viewport toggle, refresh, open button ([d9f1e85](https://github.com/draco-china/shadcn-pro/commit/d9f1e850073936406e85e13c48fb91907a94c4c1))
* **homepage:** add all pro-fields demos + sticky category nav + fix iframeSrc to /view/new-york-v4/ ([a7cadf3](https://github.com/draco-china/shadcn-pro/commit/a7cadf376e9d3dc96f7e0ef697c635e0cd1d7075))
* **homepage:** anchor nav + inline demo render + Preview/Code tabs with mobile support ([df0092e](https://github.com/draco-china/shadcn-pro/commit/df0092ea35aec8844384f24aca7cfaf33f6b55f8))
* **homepage:** category tabs with PageHeader and all component examples ([b2dacbc](https://github.com/draco-china/shadcn-pro/commit/b2dacbc1b1b80f7945baeb5bf225757ec8ff6e64))
* **home:** redesign homepage with blocks-style preview cards ([ccd79fd](https://github.com/draco-china/shadcn-pro/commit/ccd79fd2a87cafdd9769188e9b1555f007a9af47))
* monaco editor one dark pro theme in dark mode ([2b3cf7c](https://github.com/draco-china/shadcn-pro/commit/2b3cf7c5e90532a1e6bc4d1814ef326e4aa03ac5))
* move description before required asterisk in form-item; update density icon and add reset + drag-sort to column settings ([57469a5](https://github.com/draco-china/shadcn-pro/commit/57469a565e9b80915b71345f351d23086782d981))
* preview always visible + bottom collapsible code, remove --base heroui from README ([af49302](https://github.com/draco-china/shadcn-pro/commit/af493026a160fb6cde4653f7731235a618233397))
* pro-chat demo with sidebar conversations; fix meta.json add pro-input ([719f1e4](https://github.com/draco-china/shadcn-pro/commit/719f1e479205ae25bfbdbea21dcb1c8b80f907c9))
* **pro-descriptions:** view/edit mode toggle with ProForm seamless switch ([b10bdbb](https://github.com/draco-china/shadcn-pro/commit/b10bdbb04417db90ff28a9dea29e0edd9ee8372d))
* pro-editor default preview CodeViewer(code) / MarkdownViewer(markdown), lazy loaded ([6bd6bfa](https://github.com/draco-china/shadcn-pro/commit/6bd6bfab8fefe04234f59d35888c3e762fe1e5f9))
* pro-editor generic preview prop — markdown auto-enables, code mode opt-in, null to disable ([fa8920c](https://github.com/draco-china/shadcn-pro/commit/fa8920c72a9d125de5dfac799dd2dbc4d992d25c))
* pro-editor integrated toolbar — mode tabs, language select, format, copy, fullscreen ([3f3af47](https://github.com/draco-china/shadcn-pro/commit/3f3af47ee11c06abc1b5565851808bdbe80d0bb6))
* pro-editor markdown split-pane preview, lazy react-markdown, custom markdownPreview prop ([dbcafb9](https://github.com/draco-china/shadcn-pro/commit/dbcafb91359ab65c91b4c3d59ed0a6aae9f5ef27))
* **pro-fields:** add 14 new field components + mobile pagination ([f31c45e](https://github.com/draco-china/shadcn-pro/commit/f31c45e52faaa32519658c4f03743ed29fdd003b))
* **pro-fields:** register 8 new field demos + fix homepage/category-page BlockViewer props + update MDX docs ([3c8b4d2](https://github.com/draco-china/shadcn-pro/commit/3c8b4d2ab71d243a36a322c14b1eade4a333c66a))
* redesign homepage blocks layout + remove pdf-viewer and video-player ([f452026](https://github.com/draco-china/shadcn-pro/commit/f4520262f87ef2256fed636e6fffc2d8ce375c23))
* restore real dashboard-01 block, fix biome ignore for view/blocks ([09ddf11](https://github.com/draco-china/shadcn-pro/commit/09ddf1140aaf3ab6d98aef80f68adf1666718aba))
* rewrite block-viewer to match shadcn/ui blocks page; remove PageHeader from homepage; fix form-item description before asterisk; update density icon and column settings with reset+drag-sort ([37e400f](https://github.com/draco-china/shadcn-pro/commit/37e400f2bb2c10eed1eddc89e829eb113cc4dff7))


### Reverts

* **docs:** restore original ComponentPreviewTabs without extra tabs header ([a1ed3eb](https://github.com/draco-china/shadcn-pro/commit/a1ed3eb051be54c88a47ed190f0b83c1f67cf233))

# [1.15.0](https://github.com/draco-china/shadcn-pro/compare/v1.14.0...v1.15.0) (2026-05-23)


### Bug Fixes

* **registry:** register P4-P6 demos, add ui re-exports, fix pdf-viewer SSR, revert --base CLI ([11c9150](https://github.com/draco-china/shadcn-pro/commit/11c91500d95327c2bb9c8cf0bb841abe4c3030ce))


### Features

* **docs:** add HeroUI guide page and --base flag usage in README ([299ef3e](https://github.com/draco-china/shadcn-pro/commit/299ef3e2c775775529dbf969d6c6b724948f8af0))

# [1.14.0](https://github.com/draco-china/shadcn-pro/compare/v1.13.4...v1.14.0) (2026-05-23)


### Bug Fixes

* **round10:** extract CommandMenuClient wrapper for lazy loading ([8ca88e4](https://github.com/draco-china/shadcn-pro/commit/8ca88e4193df5c5b684d276ddf915e2bee09771a))
* **round6:** improve docs site quality and Next.js best practices ([949adb9](https://github.com/draco-china/shadcn-pro/commit/949adb96915b13d127ee3c41d096d84be8543bb5))
* **round8:** fix tsconfig deprecations and build config ([1fbc7a2](https://github.com/draco-china/shadcn-pro/commit/1fbc7a2ee98cc5858de91bdb5f62bb48e2271af3))


### Features

* **cli:** add --base flag to init and add commands for HeroUI support with alias rewriting ([0b2fd15](https://github.com/draco-china/shadcn-pro/commit/0b2fd15be0be52e8433ba636fc29c3ec594c0fed))
* **docs:** add demo and docs for CodeToolbar, MarkdownToolbar, RichTextToolbar ([0cf8220](https://github.com/draco-china/shadcn-pro/commit/0cf8220fd1806442bfcf5a4a971bbe1a352d3736))
* **editor:** redesign RichTextToolbar with Tiptap-style UX, active states, heading dropdown ([3676810](https://github.com/draco-china/shadcn-pro/commit/36768109cd32110017aa8489f5167c2f3b28b679))
* **editor:** upgrade CodeToolbar and MarkdownToolbar with more languages and optional Run ([fbfc973](https://github.com/draco-china/shadcn-pro/commit/fbfc973aff658115a1d43a023435d2e1c3107378))
* preview tabs redesign, pro-form description demo, editor toolbars ([e705011](https://github.com/draco-china/shadcn-pro/commit/e7050113deeee0405cf31981eb0602a9eeea0cb5))
* **viewer:** add CodeViewer component with Shiki syntax highlight, line numbers, and copy ([152cf05](https://github.com/draco-china/shadcn-pro/commit/152cf050997d07132818112cf1019db7fb99ba1a))
* **viewer:** add DiffViewer component with split/unified view and line-level diff ([2ed006f](https://github.com/draco-china/shadcn-pro/commit/2ed006fca651c28f65ca619b938e91cf1ca5c29d))
* **viewer:** add ImageViewer component with zoom/rotate/drag/multi-image support ([b6b8016](https://github.com/draco-china/shadcn-pro/commit/b6b80167ddc1c0194c0c7e51f48cc8610c56d39b))
* **viewer:** add MarkdownViewer and JsonViewer components ([a2e31c3](https://github.com/draco-china/shadcn-pro/commit/a2e31c39acfc6185f29bd63d6d263dc15debd01b))
* **viewer:** add PDFViewer component with pagination/zoom/fullscreen/download ([45bd84b](https://github.com/draco-china/shadcn-pro/commit/45bd84bc5d1d83283e0997db2e340d3b8a01f8c9))
* **viewer:** add VideoPlayer component with play/seek/volume/fullscreen controls ([e569aba](https://github.com/draco-china/shadcn-pro/commit/e569aba656ea6286175bee23502672448189a0f5))


### Performance Improvements

* **round7:** bundle and performance optimizations ([bd606f6](https://github.com/draco-china/shadcn-pro/commit/bd606f61605fb448eb25cd10d0ae1c4f1b949d96))

## [1.13.4](https://github.com/draco-china/shadcn-pro/compare/v1.13.3...v1.13.4) (2026-05-23)


### Bug Fixes

* **round1:** fix biome CSS config, lint rules, truncated theme-customizer ([0cd50be](https://github.com/draco-china/shadcn-pro/commit/0cd50be45b654efdc42bd754f226db9548043416))
* **round2:** fix biome lint errors - noDoubleEquals, any types, exhaustive deps ([623022d](https://github.com/draco-china/shadcn-pro/commit/623022d735916b1bae921690a7a749467ad4f742))
* **round3:** fix noArrayIndexKey, useButtonType, noNonNullAssertion, noSvgWithoutTitle ([de79401](https://github.com/draco-china/shadcn-pro/commit/de79401c7ed12c220ffb9b16758363cba23c839e))
* **round3:** rename unused index to _index ([f492300](https://github.com/draco-china/shadcn-pro/commit/f492300d301d0e575e84affc8e54622647ad5db9))
* **round4:** improve cli code quality ([58ee6f5](https://github.com/draco-china/shadcn-pro/commit/58ee6f5a141cbc008a7e5e01d1aea82ffc0ef78a))

## [1.13.3](https://github.com/draco-china/shadcn-pro/compare/v1.13.2...v1.13.3) (2026-05-23)


### Bug Fixes

* add pro-editor engine dependencies to registry.json ([e063e57](https://github.com/draco-china/shadcn-pro/commit/e063e57f27d8c29371684c062e1097448759dcfb))
* **lint:** auto-fix biome formatting and style issues ([f9dfdaa](https://github.com/draco-china/shadcn-pro/commit/f9dfdaaf8fc49dad6ee1d28f2301d7e99a3aff49))
* **lint:** manually fix remaining biome lint errors (node: protocol, literal keys, unused imports) ([fbb7e0d](https://github.com/draco-china/shadcn-pro/commit/fbb7e0d23a205d11db598abe893a67c83b839462))
* **pro-fields:** improve component quality and Formily bridge consistency ([68623e4](https://github.com/draco-china/shadcn-pro/commit/68623e42f0ff0c6a2ce39bb0728066ab3811a947))
* **pro-form:** improve form robustness and FormItem styling ([d400495](https://github.com/draco-china/shadcn-pro/commit/d400495af8a3851d0c7446ded3f3c76e3848bd69))
* restore github release assets to empty, keep git assets correct ([d8ea991](https://github.com/draco-china/shadcn-pro/commit/d8ea991ca32517ab8c9cb642b3f366a1e001bbe0))

## [1.13.2](https://github.com/draco-china/shadcn-pro/compare/v1.13.1...v1.13.2) (2026-05-22)


### Bug Fixes

* rewrite demos with real components, add pro-input registry entry, fix docs imports ([dd28f8a](https://github.com/draco-china/shadcn-pro/commit/dd28f8a30c4fa1ffcac4b251122419eeb503cdce))

## [1.13.1](https://github.com/draco-china/shadcn-pro/compare/v1.13.0...v1.13.1) (2026-05-22)


### Bug Fixes

* audit and repair all components ([978b3f6](https://github.com/draco-china/shadcn-pro/commit/978b3f640937c2ace81ab71c4fcb1233802b9394))

# [1.13.0](https://github.com/draco-china/shadcn-pro/compare/v1.12.0...v1.13.0) (2026-05-22)


### Features

* **pro-table,pro-form:** 5 optimizations ([6721045](https://github.com/draco-china/shadcn-pro/commit/6721045d1f7986f2a0c6ae09b06f5c750721c638))

# [1.12.0](https://github.com/draco-china/shadcn-pro/compare/v1.11.0...v1.12.0) (2026-05-22)


### Features

* **pro-table:** add drag sort + replace all tabler icons with lucide ([c0315e6](https://github.com/draco-china/shadcn-pro/commit/c0315e6fb7f46fe4f5e9644b49385f35e6cd21c4))

# [1.11.0](https://github.com/draco-china/shadcn-pro/compare/v1.10.0...v1.11.0) (2026-05-22)


### Bug Fixes

* **docs:** expand preview area height and adapt demo components ([d022f55](https://github.com/draco-china/shadcn-pro/commit/d022f55efc1de5fd93344ab09cd3abfd63a87fb9))


### Features

* **docs:** add pro components to registry and implement variant tab switching ([3ad24b9](https://github.com/draco-china/shadcn-pro/commit/3ad24b9c553784bd3a50ed12affdda68c505a803))
* **pro-table:** upgrade pagination with page numbers, ellipsis, page size select and total count ([936092b](https://github.com/draco-china/shadcn-pro/commit/936092bbaa7c8be0c949fd2f9700335b0bf827ff))

# [1.10.0](https://github.com/draco-china/shadcn-pro/compare/v1.9.4...v1.10.0) (2026-05-22)


### Bug Fixes

* **docs:** fetch star count from draco-china/shadcn-pro ([80772fd](https://github.com/draco-china/shadcn-pro/commit/80772fd0c41b36de831e0b66e64581ed2ae6bd97))
* **docs:** fix sidebar Components listing, rename Editor->ProEditor, add changelog ([bd3ef7f](https://github.com/draco-china/shadcn-pro/commit/bd3ef7f483bba20fe6f1816d91cfc86ba9d2b1dc))
* **docs:** hardcode sidebar components list to fix empty Components group ([15a4b2e](https://github.com/draco-china/shadcn-pro/commit/15a4b2e33860e59b5b561b128971f6883abeee6f))


### Features

* **docs:** restore layout toggle button in site header ([531985d](https://github.com/draco-china/shadcn-pro/commit/531985df340e6497a551a0820809f6740aeb8c4a))

## [1.9.4](https://github.com/draco-china/shadcn-pro/compare/v1.9.3...v1.9.4) (2026-05-22)


### Bug Fixes

* **docs:** move installation under components, clean up sections ([c43429f](https://github.com/draco-china/shadcn-pro/commit/c43429f45710ed27c94da146c096db42e433ed0b))

## [1.9.3](https://github.com/draco-china/shadcn-pro/compare/v1.9.2...v1.9.3) (2026-05-22)


### Bug Fixes

* **docs:** restore sidebar structure - Sections + Components groups ([632a439](https://github.com/draco-china/shadcn-pro/commit/632a439da469976b2c12c1694195f1d643033374))

## [1.9.2](https://github.com/draco-china/shadcn-pro/compare/v1.9.1...v1.9.2) (2026-05-22)


### Bug Fixes

* **docs:** clean sidebar - remove shadcn sections, remove /create route ([e9b7760](https://github.com/draco-china/shadcn-pro/commit/e9b7760788f7194fa4dfe706e8eb04ed747fdf33))

## [1.9.1](https://github.com/draco-china/shadcn-pro/compare/v1.9.0...v1.9.1) (2026-05-22)


### Bug Fixes

* **docs:** static export for GitHub Pages, remove API routes ([74ac282](https://github.com/draco-china/shadcn-pro/commit/74ac282226be990660f0487fea1f55b423335f2f))

# [1.9.0](https://github.com/draco-china/shadcn-pro/compare/v1.8.0...v1.9.0) (2026-05-22)


### Features

* add ProDescriptions and ProLayout components ([79fa5c7](https://github.com/draco-china/shadcn-pro/commit/79fa5c76ce76db6c5d4c9514876b204b0e607214))

# [1.8.0](https://github.com/draco-china/shadcn-pro/compare/v1.7.0...v1.8.0) (2026-05-22)


### Features

* **docs:** update brand to shadcn-pro, add ProForm and ProTable documentation ([a3053f9](https://github.com/draco-china/shadcn-pro/commit/a3053f9a8326203d320fc8f75b4a9808d89c8df3))

# [1.7.0](https://github.com/draco-china/shadcn-pro/compare/v1.6.0...v1.7.0) (2026-05-22)


### Features

* **docs:** rebuild with shadcn/ui v4 layout, only ui/components layer ([7f291ae](https://github.com/draco-china/shadcn-pro/commit/7f291ae3c53745fe7d2d72eea755149fbb921dfd))

# [1.6.0](https://github.com/draco-china/shadcn-pro/compare/v1.5.0...v1.6.0) (2026-05-22)


### Features

* **docs:** rebuild with fumadocs-ui v16, clean content structure ([7fdabbe](https://github.com/draco-china/shadcn-pro/commit/7fdabbe8f669587cd8d0974b06abcbcab6bfaf76))

# [1.5.0](https://github.com/draco-china/shadcn-pro/compare/v1.4.2...v1.5.0) (2026-05-22)


### Features

* **docs:** upgrade to fumadocs-ui v16 + tailwind v4, align with shadcn/ui docs style ([f104f89](https://github.com/draco-china/shadcn-pro/commit/f104f8918c62455ed9bafa958f39180f8c81ea71))

## [1.4.2](https://github.com/draco-china/shadcn-pro/compare/v1.4.1...v1.4.2) (2026-05-22)


### Bug Fixes

* **docs:** downgrade to tailwind v3, add shadcn/ui CSS variables ([e5dad2e](https://github.com/draco-china/shadcn-pro/commit/e5dad2e34a1a8b9dd2c6867d1c68f3b3749560bf))

## [1.4.1](https://github.com/draco-china/shadcn-pro/compare/v1.4.0...v1.4.1) (2026-05-22)


### Bug Fixes

* **docs:** move [@import](https://github.com/import) before tailwind directives in globals.css ([8ae96e6](https://github.com/draco-china/shadcn-pro/commit/8ae96e60fe2459919a5069048f77be83387c4bae))

# [1.4.0](https://github.com/draco-china/shadcn-pro/compare/v1.3.0...v1.4.0) (2026-05-22)


### Features

* **docs:** setup tailwind, shadcn/ui, ComponentPreview for live demos ([e16a109](https://github.com/draco-china/shadcn-pro/commit/e16a109cfc0325a6e962eb85459b10c5ab1fafaa))

# [1.3.0](https://github.com/draco-china/shadcn-pro/compare/v1.2.1...v1.3.0) (2026-05-22)


### Features

* **docs:** add interactive demos for ProForm and ProTable ([83afb20](https://github.com/draco-china/shadcn-pro/commit/83afb20bc91135960eea08fbb8d66df23c34e25d))

## [1.2.1](https://github.com/draco-china/shadcn-pro/compare/v1.2.0...v1.2.1) (2026-05-22)


### Bug Fixes

* **editor:** remove unused biome-ignore, fix dynamic import type formatting ([46a62b6](https://github.com/draco-china/shadcn-pro/commit/46a62b6ffc7e1732cee59001c41b6a2456fb1cba))

# [1.2.0](https://github.com/draco-china/shadcn-pro/compare/v1.1.0...v1.2.0) (2026-05-22)


### Features

* **registry:** add ArrayField and ObjectField components ([5d9d883](https://github.com/draco-china/shadcn-pro/commit/5d9d883930ba5bef900b21bf6c13decabbf0f1ba))

# [1.1.0](https://github.com/draco-china/shadcn-pro/compare/v1.0.0...v1.1.0) (2026-05-22)


### Features

* add pro-table and editor components with docs pages ([dbaca20](https://github.com/draco-china/shadcn-pro/commit/dbaca203a1b99c0a656795382f6ee68e72849494))

# 1.0.0 (2026-05-22)


### Features

* initial monorepo setup ([b3ba506](https://github.com/draco-china/shadcn-pro/commit/b3ba50619e897c7c246d38154b5afe674ffdb2a4))
