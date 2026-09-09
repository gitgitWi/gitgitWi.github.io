import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const wikiLayoutStyles = stylex.create({
  grid: {
    display: "grid",
    gap: tokens.space[8],
    alignItems: "start",
  },
  gridWithSidebar: {
    gridTemplateColumns: {
      default: "1fr",
      "@media (min-width: 768px)": "200px minmax(0, 1fr)",
    },
  },
  sidebar: {
    display: {
      default: "none",
      "@media (min-width: 768px)": "block",
    },
  },
  main: {
    minWidth: 0,
  },
  meta: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.space[2],
    alignItems: "center",
    fontFamily: tokens.fontFamily.mono,
    fontSize: tokens.fontSize.sm,
    color: tokens.color.inkTertiary,
  },
  tagRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.space[2],
  },
  quizRefs: {
    marginTop: tokens.space[8],
    paddingTop: tokens.space[6],
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: tokens.color.border,
  },
  pager: {
    display: "flex",
    justifyContent: "space-between",
    gap: tokens.space[4],
    marginTop: tokens.space[10],
    paddingTop: tokens.space[6],
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: tokens.color.border,
    fontFamily: tokens.fontFamily.mono,
    fontSize: tokens.fontSize.sm,
  },
});
