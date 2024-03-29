import { ToolCard } from './components/tool-card';
import { metadata as base64Metadata } from './encode-decode/base64/page';
import { metadata as base64URLMetadata } from './encode-decode/base64url/page';
import { metadata as urlMetadata } from './encode-decode/url/page';

const tools = [
  {
    href: '/toolbox/encode-decode/base64',
    ...base64Metadata,
  },
  {
    href: '/toolbox/encode-decode/base64url',
    ...base64URLMetadata,
  },
  {
    href: '/toolbox/encode-decode/url',
    ...urlMetadata,
  },
] satisfies React.ComponentProps<typeof ToolCard>[];

export default function ToolboxPage() {
  return (
    <main className="container">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool) => (
          <ToolCard
            key={tool.href}
            href={tool.href}
            title={tool.title}
            description={tool.description}
          />
        ))}
      </div>
    </main>
  );
}
