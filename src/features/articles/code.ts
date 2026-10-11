import { slotCode } from '@/common/helpers/slot-code';

import { articles } from '@/velite';

/** The article's position code on the board, e.g. "W-01". */
export function articleCode(slug: string): string {
  return slotCode('W', articles, slug);
}
