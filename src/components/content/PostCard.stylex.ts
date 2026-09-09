import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const postCardStyles = stylex.create({
  article: {
    paddingBlock: tokens.space[6],
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.color.border,
  },
  meta: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: tokens.space[2],
    marginBottom: tokens.space[2],
    fontFamily: tokens.fontFamily.mono,
    fontSize: tokens.fontSize.sm,
    color: tokens.color.inkTertiary,
  },
  title: {
    fontSize: tokens.fontSize.lg,
    fontWeight: 600,
    fontFamily: tokens.fontFamily.sans,
    color: {
      default: tokens.color.ink,
      ":hover": tokens.color.accent,
    },
    textDecoration: "none",
    marginBottom: tokens.space[2],
    display: "block",
    transitionProperty: "color",
    transitionDuration: tokens.duration.fast,
  },
  summary: {
    fontSize: tokens.fontSize.md,
    color: tokens.color.inkSecondary,
    lineHeight: tokens.lineHeight.body,
    marginBottom: tokens.space[3],
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.space[2],
  },
});
