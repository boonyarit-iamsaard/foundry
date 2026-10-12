/**
 * Structured data for search engines. `<` is escaped so text inside the data,
 * such as an article title, can never close the script tag early.
 */
export function JsonLd({ data }: Readonly<{ data: object }>) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD has to be the script's raw text, and `<` is escaped.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
