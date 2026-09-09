import * as stylex from '@stylexjs/stylex';

import { tokens } from '../../styles/tokens.stylex.ts';

export const clusterStyles = stylex.create({
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  gapSm: {
    gap: tokens.space.sm,
  },
  gapMd: {
    gap: tokens.space.md,
  },
  gapLg: {
    gap: tokens.space.lg,
  },
});
