import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const articleLayoutStyles = stylex.create({
  grid: {
    display: "grid",
    gap: tokens.space[10],
    alignItems: "start",
  },
  gridWithToc: {
    gridTemplateColumns: {
      default: "1fr",
      "@media (min-width: 1024px)": "minmax(0, 1fr) 200px",
    },
  },
  main: {
    minWidth: 0,
  },
  toc: {
    display: {
      default: "none",
      "@media (min-width: 1024px)": "block",
    },
  },
  meta: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.space[2],
    alignItems: "center",
    fontFamily: tokens.fontFamily.mono,
    fontSize: tokens.fontSize.sm,
    color: tokens.color.inkTertiary,
    marginBottom: tokens.space[4],
  },
  title: {
    marginBottom: tokens.space[4],
  },
  description: {
    marginBottom: tokens.space[8],
  },
});
