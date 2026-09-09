import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const headingStyles = stylex.create({
  base: {
    margin: 0,
    color: tokens.color.ink,
    lineHeight: tokens.lineHeight.tight,
    fontWeight: 600,
    fontFamily: tokens.fontFamily.sans,
  },
  level1: {
    fontSize: tokens.fontSize["2xl"],
  },
  level2: {
    fontSize: tokens.fontSize.xl,
  },
  level3: {
    fontSize: tokens.fontSize.lg,
  },
  level4: {
    fontSize: tokens.fontSize.md,
  },
  display: {
    fontFamily: tokens.fontFamily.display,
    fontWeight: 400,
    fontSize: tokens.fontSize.display,
    lineHeight: tokens.lineHeight.display,
  },
});
