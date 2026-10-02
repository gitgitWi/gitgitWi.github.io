import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../styles/tokens.stylex.ts";

export const heroVisualStyles = stylex.create({
  root: {
    position: "relative",
    width: "100%",
    aspectRatio: "1",
    maxWidth: "420px",
    marginInline: "auto",
  },
  fallback: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    borderRadius: tokens.radius.lg,
  },
});
