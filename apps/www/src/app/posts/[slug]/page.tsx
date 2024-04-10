import { JsonLd } from '@/app/components/json-ld';
import { APP_URL } from '@/app/lib/constants';
import { safeParseOrNotFound } from '@/app/lib/safe-parse-or-not-found';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Input } from 'valibot';
import { getLocalPostBySlug, getLocalPostSlugs } from '../lib/get-posts';
import { ParamsSchema } from './lib/params-schema';

interface Props {
  params: Input<typeof ParamsSchema>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = safeParseOrNotFound(ParamsSchema, params);
  const post = await getLocalPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: 'article',
      publishedTime: post.publishDate.toISOString(),
    },
  };
}

export function generateStaticParams() {
  const slugs = getLocalPostSlugs();

  return slugs.map((slug) => ({
    slug,
  })) satisfies Props['params'][];
}

export default async function PostPage({ params }: Props) {
  const { slug } = safeParseOrNotFound(ParamsSchema, params);
  const post = await getLocalPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { component: PostComponent } = post;

  return (
    <div>
      <main className="container">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            image: [
              new URL(
                typeof post.thumbnail === 'string'
                  ? post.thumbnail
                  : post.thumbnail.src,
                APP_URL,
              ).toString(),
            ],
            datePublished: post.publishDate.toString(),
            author: [
              {
                '@type': 'Person',
                name: 'shota',
                url: APP_URL,
              },
            ],
          }}
        />

        <PostComponent />
      </main>
    </div>
  );
}
