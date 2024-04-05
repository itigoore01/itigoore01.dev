/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
import { SUZUKISHOUTEN_BLOG_POSTS_API_URL } from '@/app/lib/constants';
import { getGoogleFont } from '@/app/lib/get-google-font';
import { safeParseOrNotFound } from '@/app/lib/safe-parse-or-not-found';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { Input, object, string, transform } from 'valibot';
import { getSuzukishoutenPosts } from '../../lib/get-posts';

const ParamsSchema = object({
  id: string(),
});

const WpJsonPostSchema = object({
  title: object({
    rendered: transform(string(), (input) =>
      input.replaceAll(/&#(\d+);/g, (_, charCode: string) =>
        String.fromCodePoint(parseInt(charCode)),
      ),
    ),
  }),
});

interface Context {
  params: Input<typeof ParamsSchema>;
}

export async function generateStaticParams() {
  const posts = await getSuzukishoutenPosts();

  return posts.map((post) => ({ id: post.id }));
}

export async function GET(request: Request, context: Context) {
  const { id } = safeParseOrNotFound(ParamsSchema, context.params);

  const response = await fetch(
    new URL(`${SUZUKISHOUTEN_BLOG_POSTS_API_URL}/${id}`),
  );

  if (!response.ok) {
    notFound();
  }

  const post = safeParseOrNotFound(WpJsonPostSchema, await response.json());

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '#00b976',
          padding: '40px',
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'flex',
            width: '100%',
            height: '100%',
            borderRadius: '24px',
            backgroundColor: 'white',
            padding: '49px',
            boxShadow:
              '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          }}
        >
          <div
            style={{
              fontSize: '56px',
              lineHeight: '1.2',
            }}
          >
            {post.title.rendered}
          </div>

          <div
            style={{
              display: 'flex',
              position: 'absolute',
              bottom: '40px',
              right: '40px',
            }}
          >
            <img
              src="data:image/png;base64,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"
              width={280}
              height={38}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Noto Sans JP',
          data: await getGoogleFont('Noto Sans JP', 700, post.title.rendered),
          weight: 700,
          style: 'normal',
        },
      ],
    },
  );
}
