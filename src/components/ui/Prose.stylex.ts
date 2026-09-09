import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const proseStyles = stylex.create({
  base: {
    color: tokens.color.ink,
    fontSize: tokens.fontSize.md,
    lineHeight: tokens.lineHeight.body,
    fontFamily: tokens.fontFamily.sans,
    maxWidth: tokens.layout.readingMax,
  },
});
