import { slotCode } from '@/common/helpers/slot-code';

import { projects } from '@/velite';

/** The project's position code on the board, e.g. "P-01". */
export function projectCode(slug: string): string {
  return slotCode('P', projects, slug);
}
