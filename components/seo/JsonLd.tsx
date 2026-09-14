interface JsonLdProps {
  schema: Record<string, unknown> | Record<string, unknown>[]
}

export function JsonLd({ schema }: JsonLdProps) {
  const jsonString = JSON.stringify(
    Array.isArray(schema) ? { '@context': 'https://schema.org', '@graph': schema } : schema
  )

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  )
}
