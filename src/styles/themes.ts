import * as stylex from "@stylexjs/stylex";

import { tokens } from "./tokens.stylex.ts";

/** Phase 2에서 실값을 채운다. */
export const paperTheme = stylex.unstable_createThemeNested(tokens, {});

export const sageTheme = stylex.unstable_createThemeNested(tokens, {});

export const clayTheme = stylex.unstable_createThemeNested(tokens, {});

export const inkTheme = stylex.unstable_createThemeNested(tokens, {});

export const colorwayThemes = {
  paper: paperTheme,
  sage: sageTheme,
  clay: clayTheme,
  ink: inkTheme,
} as const;

export type Colorway = keyof typeof colorwayThemes;
