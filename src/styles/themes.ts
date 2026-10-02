import * as stylex from "@stylexjs/stylex";

import { tokens } from "./tokens.stylex.ts";

/** Default warm editorial palette (design.md contract). */
export const canvasTheme = stylex.unstable_createThemeNested(tokens, {});

/** Mint colorway — canvas 토큰은 ColorwayShell variant style로 오버라이드한다. */
export const mintTheme = stylex.unstable_createThemeNested(tokens, {});

/** Clay colorway. */
export const clayTheme = stylex.unstable_createThemeNested(tokens, {});

/** Ink colorway. */
export const inkTheme = stylex.unstable_createThemeNested(tokens, {});

export const colorwayThemes = {
  canvas: canvasTheme,
  mint: mintTheme,
  clay: clayTheme,
  ink: inkTheme,
} as const;

export type Colorway = keyof typeof colorwayThemes;
