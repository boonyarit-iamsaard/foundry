import { describe, expect, it } from 'vitest';

import { modifiedDate } from './date';

describe('modifiedDate', () => {
  it('uses the updated date when content was revised', () => {
    expect(
      modifiedDate({
        date: '2025-04-04T06:00:00.000Z',
        updated: '2025-06-01T06:00:00.000Z',
      }),
    ).toBe('2025-06-01T06:00:00.000Z');
  });

  it('falls back to the publish date when content was never revised', () => {
    expect(modifiedDate({ date: '2025-04-04T06:00:00.000Z' })).toBe(
      '2025-04-04T06:00:00.000Z',
    );
  });
});
