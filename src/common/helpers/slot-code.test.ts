import { describe, expect, expectTypeOf, it } from 'vitest';

import { slotCode } from './slot-code';

const items = [
  { slug: 'newest', date: '2025-03-01' },
  { slug: 'oldest', date: '2024-01-01' },
  { slug: 'middle', date: '2024-06-01' },
];

describe('slotCode', () => {
  it('numbers items oldest first', () => {
    expect(slotCode('W', items, 'oldest')).toBe('W-01');
    expect(slotCode('W', items, 'middle')).toBe('W-02');
    expect(slotCode('W', items, 'newest')).toBe('W-03');
  });

  it('keeps an existing code when newer work is added', () => {
    const withNewer = [...items, { slug: 'later', date: '2026-01-01' }];

    expect(slotCode('P', withNewer, 'middle')).toBe(
      slotCode('P', items, 'middle'),
    );
  });

  it('pads to two digits', () => {
    const many = Array.from({ length: 12 }, (_, i) => ({
      slug: `item-${i}`,
      date: `2024-01-${String(i + 1).padStart(2, '0')}`,
    }));

    expect(slotCode('P', many, 'item-11')).toBe('P-12');
  });

  it('refuses a slug that is not on the board', () => {
    expect(() => slotCode('P', items, 'missing')).toThrow('missing');
  });

  it('codes only projects and articles', () => {
    expectTypeOf(slotCode).parameter(0).toEqualTypeOf<'P' | 'W'>();
  });
});
