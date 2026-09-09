import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const textStyles = stylex.create({
  base: {
    margin: 0,
    lineHeight: tokens.lineHeight.body,
    fontFamily: tokens.fontFamily.sans,
  },
  body: {
    fontSize: tokens.fontSize.md,
    color: tokens.color.ink,
  },
  muted: {
    fontSize: tokens.fontSize.md,
    color: tokens.color.inkSecondary,
  },
  caption: {
    fontSize: tokens.fontSize.sm,
    color: tokens.color.inkTertiary,
    fontFamily: tokens.fontFamily.mono,
  },
  label: {
    fontSize: tokens.fontSize.sm,
    color: tokens.color.inkTertiary,
    fontFamily: tokens.fontFamily.mono,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
});
