import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const cardStyles = stylex.create({
  base: {
    backgroundColor: tokens.color.surface,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: tokens.color.border,
    borderRadius: tokens.radius.md,
  },
  paddingSm: {
    padding: tokens.space[3],
  },
  paddingMd: {
    padding: tokens.space[4],
  },
});
