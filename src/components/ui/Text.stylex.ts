import * as stylex from '@stylexjs/stylex';

import { tokens } from '../../styles/tokens.stylex.ts';

export const textStyles = stylex.create({
  base: {
    margin: 0,
    lineHeight: tokens.lineHeight.body,
  },
  body: {
    fontSize: tokens.fontSize.md,
    color: tokens.color.ink,
  },
  muted: {
    fontSize: tokens.fontSize.md,
    color: tokens.color.muted,
  },
  caption: {
    fontSize: tokens.fontSize.sm,
    color: tokens.color.muted,
  },
});
