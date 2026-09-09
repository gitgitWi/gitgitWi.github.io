import { defineConfig } from "astro/config";
import stylex from "@stylexjs/unplugin";

import preact from "@astrojs/preact";

export default defineConfig({
  site: "https://gitgitwi.github.io",

  markdown: {
    syntaxHighlight: "prism",
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

  integrations: [preact()],
});
