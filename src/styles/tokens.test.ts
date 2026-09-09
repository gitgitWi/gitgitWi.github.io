import { describe, expect, it } from 'vitest';

import { tokens } from './tokens.stylex.ts';

describe('tokens', () => {
  it('paper와 ink 토큰 키가 존재한다', () => {
    expect(tokens.color.paper).toBeDefined();
    expect(tokens.color.ink).toBeDefined();
  });
});
