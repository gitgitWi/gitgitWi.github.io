import { defineConfig } from "astro/config";
import stylex from "@stylexjs/unplugin";

export default defineConfig({
  site: "https://gitgitwi.github.io",
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
});
