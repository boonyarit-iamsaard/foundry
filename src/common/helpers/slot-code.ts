type Dated = Readonly<{ slug: string; date: string }>;

/**
 * A stable position code for an item on the board, numbered oldest first so
 * an item keeps its code when newer work is hung beside it.
 */
export function slotCode(prefix: string, items: Dated[], slug: string): string {
  const ordered = items.toSorted(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const index = ordered.findIndex((item) => item.slug === slug);

  return `${prefix}-${String(index + 1).padStart(2, '0')}`;
}
