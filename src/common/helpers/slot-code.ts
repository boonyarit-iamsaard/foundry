/**
 * The kind of thing hung in a slot: B board, C contact, R resume,
 * L long-form, P project, W writing.
 */
export type SlotPrefix = 'B' | 'C' | 'R' | 'L' | 'P' | 'W';

type Dated = Readonly<{ slug: string; date: string }>;

/**
 * A stable position code for an item on the board, numbered oldest first so
 * an item keeps its code when newer work is hung beside it.
 */
export function slotCode(
  prefix: SlotPrefix,
  items: readonly Dated[],
  slug: string,
): string {
  const ordered = items.toSorted(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const index = ordered.findIndex((item) => item.slug === slug);

  if (index === -1) {
    throw new Error(`No item "${slug}" to give a ${prefix} code`);
  }

  return `${prefix}-${String(index + 1).padStart(2, '0')}`;
}
