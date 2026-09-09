import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const heroSectionStyles = stylex.create({
  section: {
    paddingBlock: tokens.space[12],
  },
  grid: {
    display: "grid",
    gap: tokens.space[10],
    alignItems: "center",
    gridTemplateColumns: {
      default: "1fr",
      "@media (min-width: 768px)": "1fr 1fr",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.space[4],
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.space[3],
    marginTop: tokens.space[2],
  },
  visual: {
    order: {
      default: 1,
      "@media (min-width: 768px)": 0,
    },
  },
  textBlock: {
    order: {
      default: 0,
      "@media (min-width: 768px)": 0,
    },
  },
});
