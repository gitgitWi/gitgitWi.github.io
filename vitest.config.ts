import stylex from "@stylexjs/unplugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    stylex.vite({
      useCSSLayers: true,
      runtimeInjection: false,
    }),
  ],
  test: {
    passWithNoTests: true,
  },
});
