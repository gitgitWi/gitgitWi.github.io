import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const siteHeaderStyles = stylex.create({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBlock: tokens.space[4],
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.color.border,
  },
  brand: {
    fontSize: tokens.fontSize.lg,
    fontWeight: 600,
    fontFamily: tokens.fontFamily.sans,
    color: tokens.color.ink,
    textDecoration: "none",
  },
  nav: {
    display: "flex",
    gap: tokens.space[6],
  },
  navLink: {
    color: {
      default: tokens.color.inkSecondary,
      ":hover": tokens.color.accent,
    },
    textDecoration: "none",
    fontSize: tokens.fontSize.sm,
    fontFamily: tokens.fontFamily.sans,
  },
});
