import { defineConfig } from "astro/config";
import stylex from "@stylexjs/unplugin";
import preact from "@astrojs/preact";
import mdx from "@astrojs/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";

const markdownPlugins = {
  remarkPlugins: [remarkGfm, remarkSmartypants],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "wrap" }],
    [rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
  ],
};

export default defineConfig({
  site: "https://gitgitwi.github.io",

  markdown: {
    syntaxHighlight: "prism",
    ...markdownPlugins,
  },

  vite: {
    build: {
      assetsInlineLimit: 0,
    },
    plugins: [
      stylex.vite({
        useCSSLayers: true,
        runtimeInjection: false,
      }),
    ],
  },

  integrations: [preact(), mdx(markdownPlugins)],
});
