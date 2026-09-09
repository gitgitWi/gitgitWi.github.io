import stylex from "@stylexjs/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: ["**/*.astro", "**/*.stories.ts"],
  },
  {
    files: ["src/**/*.stylex.ts", "src/styles/themes.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@stylexjs": stylex,
    },
    rules: {
      "@stylexjs/valid-styles": "error",
      "@stylexjs/no-unused": "error",
    },
  },
];
