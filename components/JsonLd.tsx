// A plain <script> (not next/script) so the JSON-LD is in the server HTML.
// "<" is escaped so text from content files can never close the tag.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
