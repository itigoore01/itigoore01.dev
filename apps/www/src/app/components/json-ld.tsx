import type { Thing, WithContext } from 'schema-dts';

interface Props {
  data: WithContext<Thing>;
}

export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
