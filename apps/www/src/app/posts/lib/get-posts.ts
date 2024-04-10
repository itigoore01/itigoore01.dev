import { Route } from 'next';
import { StaticImageData } from 'next/image';
import RSSParser from 'rss-parser';
import {
  Input,
  Output,
  array,
  date,
  literal,
  merge,
  object,
  optional,
  parse,
  special,
  string,
  transform,
  union,
  url,
  variant,
} from 'valibot';
import { SUZUKISHOUTEN_BLOG_RSS_URL, ZENN_RSS_URL } from '../../lib/constants';
import { lazyLocalPosts } from '../contents';

const staticImageData = () =>
  special<StaticImageData>(
    (input) =>
      input != null &&
      typeof input === 'object' &&
      'src' in input &&
      typeof input.src === 'string' &&
      'height' in input &&
      typeof input.height === 'number' &&
      'width' in input &&
      typeof input.width === 'number',
  );

export const BasePostSchema = object({
  id: string(),
  title: string(),
  description: optional(string()),
});
export type BasePost = Output<typeof BasePostSchema>;

export const LocalPostSchema = merge([
  BasePostSchema,
  object({
    type: literal('local'),
    href: special<Route<`/posts/${string}`>>(
      (input) =>
        (input != null && typeof input === 'string') ||
        typeof input === 'object',
    ),
    thumbnail: union([string(), staticImageData()]),
    publishDate: date(),
    component: special<React.FC>((input) => typeof input === 'function'),
  }),
]);
export type LocalPost = Output<typeof LocalPostSchema>;

export const ExternalPostSchema = merge([
  BasePostSchema,
  object({
    type: literal('external'),
    via: union([literal('zenn'), literal('suzukishouten')]),
    href: string([url()]),
    thumbnail: union([string(), staticImageData()]),
    publishDate: transform(string(), (input) => new Date(input), date()),
  }),
]);
export type ExternalPost = Output<typeof ExternalPostSchema>;

export const PostSchema = variant('type', [
  LocalPostSchema,
  ExternalPostSchema,
]);
export type Post = Output<typeof PostSchema>;

export async function getLocalPosts() {
  return parse(
    array(LocalPostSchema),
    await Promise.all(
      Object.entries(lazyLocalPosts).map(async ([slug, importLocalPost]) => {
        const { meta, default: component } = await importLocalPost();

        return {
          type: 'local',
          id: slug,
          title: meta.title,
          description: meta.description,
          href: `/posts/${slug}` satisfies Route<`/posts/${string}`>,
          publishDate: meta.publishDate,
          thumbnail: meta.thumbnail ?? `/posts/${slug}/opengraph-image`,
          component,
        } satisfies Partial<Input<typeof LocalPostSchema>>;
      }),
    ),
  ).toSorted((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf());
}

export async function getZennPosts() {
  const response = await fetch(ZENN_RSS_URL);

  if (!response.ok) {
    throw new Error('Fetch Zenn RSS feed failed.', { cause: response });
  }

  const rssParser = new RSSParser<
    Record<string, unknown>,
    {
      description?: string;
    }
  >({
    customFields: {
      item: ['description'],
    },
  });
  const feed = await rssParser.parseString(await response.text());

  return parse(
    array(ExternalPostSchema),
    feed.items.map(
      (item) =>
        ({
          type: 'external',
          id: item.link,
          via: 'zenn',
          title: item.title,
          description: item.description,
          href: item.link,
          publishDate: item.pubDate,
          thumbnail: item.enclosure?.url,
        }) satisfies Partial<Input<typeof ExternalPostSchema>>,
    ),
  ).toSorted((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf());
}

export async function getSuzukishoutenPosts() {
  const response = await fetch(SUZUKISHOUTEN_BLOG_RSS_URL);

  if (!response.ok) {
    throw new Error('Fetch Zenn RSS feed failed.', { cause: response });
  }

  const rssParser = new RSSParser<
    Record<string, unknown>,
    {
      description?: string;
    }
  >({
    customFields: {
      item: ['description'],
    },
  });
  const feed = await rssParser.parseString(await response.text());

  return parse(
    array(ExternalPostSchema),
    feed.items.map((item) => {
      const id = item.link?.split('/').at(-1);

      return {
        type: 'external',
        id,
        via: 'suzukishouten',
        title: item.title,
        description: item.description,
        href: item.link,
        publishDate: item.pubDate,
        thumbnail: id
          ? `/posts/suzukishouten-thumbnail/${encodeURIComponent(id)}`
          : undefined,
      } satisfies Partial<Input<typeof ExternalPostSchema>>;
    }),
  ).toSorted((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf());
}

export async function getPosts() {
  const localPosts = await getLocalPosts();
  const zennPosts = await getZennPosts();
  const suzukishoutenPosts = await getSuzukishoutenPosts();

  return [...localPosts, ...zennPosts, ...suzukishoutenPosts].toSorted(
    (a, b) => b.publishDate.valueOf() - a.publishDate.valueOf(),
  );
}

export async function getLocalPostBySlug(slug: string) {
  if (!(slug in lazyLocalPosts)) {
    return null;
  }

  const importLocalPost = lazyLocalPosts[slug];

  const { meta, default: component } = await importLocalPost();

  return parse(LocalPostSchema, {
    type: 'local',
    id: slug,
    title: meta.title,
    description: meta.description,
    href: `/posts/${slug}` satisfies Route<`/posts/${string}`>,
    publishDate: meta.publishDate,
    thumbnail: meta.thumbnail ?? `/posts/${slug}/opengraph-image`,
    component,
  } satisfies Partial<Input<typeof LocalPostSchema>>);
}

export function getLocalPostSlugs() {
  return Object.keys(lazyLocalPosts);
}
