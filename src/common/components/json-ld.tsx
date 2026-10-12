type JsonLdProps = Readonly<{
  data: object;
}>;

/**
 * Structured data for search engines. `<` is escaped so text inside the data,
 * such as an article title, can never close the script tag early.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD has to be the script's raw text, and `<` is escaped.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replaceAll('<', String.raw`\u003c`),
      }}
    />
  );
}
