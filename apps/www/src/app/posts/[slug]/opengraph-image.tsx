import { getGoogleFont } from '@/app/lib/get-google-font';
import { safeParseOrNotFound } from '@/app/lib/safe-parse-or-not-found';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { Input } from 'valibot';
import { getLocalPostBySlug } from '../lib/get-posts';
import { ParamsSchema } from './lib/params-schema';

interface Props {
  params: Input<typeof ParamsSchema>;
}

export default async function PostImage({ params }: Props) {
  const { slug } = safeParseOrNotFound(ParamsSchema, params);
  const post = await getLocalPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {post.title}
      </div>
    ),
    {
      fonts: [
        {
          name: 'Noto Sans JP',
          data: await getGoogleFont('Noto Sans JP', 700, post.title),
          weight: 700,
          style: 'normal',
        },
      ],
    },
  );
}
