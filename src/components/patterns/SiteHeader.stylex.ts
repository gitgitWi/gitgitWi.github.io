import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const siteHeaderStyles = stylex.create({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBlock: tokens.space.md,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.color.hairline,
  },
  brand: {
    fontSize: tokens.fontSize.lg,
    fontWeight: 600,
    color: tokens.color.ink,
    textDecoration: "none",
  },
  nav: {
    display: "flex",
    gap: tokens.space.md,
  },
  navLink: {
    color: {
      default: tokens.color.muted,
      ":hover": tokens.color.accent,
    },
    textDecoration: "none",
    fontSize: tokens.fontSize.sm,
  },
});
