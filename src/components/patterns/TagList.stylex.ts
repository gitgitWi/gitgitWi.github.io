import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const tagListStyles = stylex.create({
  list: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.space.sm,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
});
