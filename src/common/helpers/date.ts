export function formatDate(date: string | number | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export type Dated = Readonly<{ date: string; updated?: string }>;

/**
 * When content last changed: its `updated` date, or its publish date if it
 * was never revised.
 */
export function modifiedDate({ date, updated }: Dated): string {
  return updated ?? date;
}
