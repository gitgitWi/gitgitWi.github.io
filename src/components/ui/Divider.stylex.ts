import * as stylex from '@stylexjs/stylex';

import { tokens } from '../../styles/tokens.stylex.ts';

export const dividerStyles = stylex.create({
  base: {
    borderWidth: 0,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: tokens.color.hairline,
    marginBlock: tokens.space.md,
  },
});
