import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const colorwayShellStyles = stylex.create({
  shell: {
    minHeight: "100%",
    backgroundColor: tokens.color.canvas,
    color: tokens.color.ink,
  },
  canvas: {},
  mint: {
    backgroundColor: tokens.color.mintCanvas,
  },
  clay: {
    backgroundColor: tokens.color.clayCanvas,
  },
  ink: {
    backgroundColor: tokens.color.inkCanvas,
    color: tokens.color.inkPrimary,
  },
});
