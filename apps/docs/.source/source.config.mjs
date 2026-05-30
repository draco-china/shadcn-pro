// source.config.ts
import { pageSchema } from "fumadocs-core/source/schema";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import rehypePrettyCode from "rehype-pretty-code";
import { z } from "zod";

// lib/highlight-code.ts
import { LRUCache } from "lru-cache";
import { codeToHtml } from "shiki";
var highlightCache = new LRUCache({
  max: 500,
  ttl: 1e3 * 60 * 60
  // 1 hour.
});
function replaceCommandPrefix(raw, search, replacement) {
  return raw.replace(search, replacement);
}
var transformers = [
  {
    code(node) {
      if (node.tagName === "code") {
        const raw = this.source;
        node.properties.__raw__ = raw;
        if (raw.startsWith("npm install")) {
          node.properties.__npm__ = raw;
          node.properties.__yarn__ = replaceCommandPrefix(raw, /^npm install\b/gm, "yarn add");
          node.properties.__pnpm__ = replaceCommandPrefix(raw, /^npm install\b/gm, "pnpm add");
          node.properties.__bun__ = replaceCommandPrefix(raw, /^npm install\b/gm, "bun add");
        } else if (raw.startsWith("npx create-")) {
          node.properties.__npm__ = raw;
          node.properties.__yarn__ = replaceCommandPrefix(raw, /^npx create-/gm, "yarn create ");
          node.properties.__pnpm__ = replaceCommandPrefix(raw, /^npx create-/gm, "pnpm create ");
          node.properties.__bun__ = replaceCommandPrefix(raw, /^npx\b/gm, "bunx --bun");
        } else if (raw.startsWith("npm create")) {
          node.properties.__npm__ = raw;
          node.properties.__yarn__ = replaceCommandPrefix(raw, /^npm create\b/gm, "yarn create");
          node.properties.__pnpm__ = replaceCommandPrefix(raw, /^npm create\b/gm, "pnpm create");
          node.properties.__bun__ = replaceCommandPrefix(raw, /^npm create\b/gm, "bun create");
        } else if (raw.startsWith("npx")) {
          node.properties.__npm__ = raw;
          node.properties.__yarn__ = replaceCommandPrefix(raw, /^npx\b/gm, "yarn dlx");
          node.properties.__pnpm__ = replaceCommandPrefix(raw, /^npx\b/gm, "pnpm dlx");
          node.properties.__bun__ = replaceCommandPrefix(raw, /^npx\b/gm, "bunx --bun");
        } else if (raw.startsWith("npm run")) {
          node.properties.__npm__ = raw;
          node.properties.__yarn__ = replaceCommandPrefix(raw, /^npm run\b/gm, "yarn");
          node.properties.__pnpm__ = replaceCommandPrefix(raw, /^npm run\b/gm, "pnpm");
          node.properties.__bun__ = replaceCommandPrefix(raw, /^npm run\b/gm, "bun");
        }
      }
    }
  }
];

// source.config.ts
var source_config_default = defineConfig({
  mdxOptions: {
    rehypePlugins: (plugins) => {
      plugins.shift();
      plugins.push([
        rehypePrettyCode,
        {
          theme: {
            dark: "one-dark-pro",
            light: "one-light"
          },
          transformers
        }
      ]);
      return plugins;
    }
  }
});
var docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: pageSchema.extend({
      links: z.object({
        doc: z.string().optional(),
        api: z.string().optional()
      }).optional()
    })
  }
});
export {
  source_config_default as default,
  docs
};
