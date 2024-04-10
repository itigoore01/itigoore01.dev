import { DEFAULT_LOCALE } from '@/app/lib/constants';
import { ExternalPost, LocalPost } from '@/app/posts/lib/get-posts';
import { Card, CardContent } from '@itigoore01.dev/ui/card';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import suzukishoutenIcon from './suzukishouten-icon.png';
import zennIcon from './zenn-icon.png';

const VIA_MAP = {
  zenn: {
    name: 'Zenn',
    icon: zennIcon,
  },
  suzukishouten: {
    name: '鈴木商店',
    icon: suzukishoutenIcon,
  },
} satisfies Record<
  ExternalPost['via'],
  {
    name: string;
    icon: StaticImageData;
  }
>;

export interface PostListProps {
  children?: React.ReactNode;
}

export function PostList({ children }: PostListProps) {
  return (
    <nav className="grid grid-cols-1 gap-10 @lg:grid-cols-2 @5xl:grid-cols-3">
      {children}
    </nav>
  );
}

export interface LocalPostListItemProps {
  post: LocalPost;
}

export function LocalPostListItem({ post }: LocalPostListItemProps) {
  return (
    <Link
      href={post.href}
      className="row-span-3 grid grid-rows-subgrid gap-0 transition-transform hover:scale-105"
    >
      <Card className="row-span-full grid grid-rows-subgrid">
        <Image
          className="aspect-[120/63] rounded-t-lg object-cover"
          src={post.thumbnail}
          width={600}
          height={300}
          alt="サムネイル"
        />

        <CardContent className="row-span-2 grid grid-rows-subgrid gap-0 pt-4">
          <div className="text-lg font-bold">{post.title}</div>

          <div className="text-sm text-muted-foreground">
            {post.publishDate.toLocaleString(DEFAULT_LOCALE, {
              dateStyle: 'medium',
            })}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

interface ExternalPostListItemProps {
  post: ExternalPost;
}

export function ExternalPostListItem({ post }: ExternalPostListItemProps) {
  return (
    <a
      href={post.href}
      target="_blank"
      className="row-span-2 grid grid-rows-subgrid gap-0 transition-transform hover:scale-105"
    >
      <Card className="row-span-full grid grid-rows-subgrid">
        <Image
          className="aspect-[120/63] rounded-t-lg object-cover"
          src={post.thumbnail}
          width={600}
          height={300}
          alt={post.title}
        />

        <CardContent className="grid grid-rows-subgrid gap-2 pt-4">
          <div className="grid grid-cols-[max-content_minmax(0,1fr)] grid-rows-2 gap-x-2 text-xs">
            <Image
              className="row-span-full rounded border border-border"
              width={32}
              height={32}
              src={VIA_MAP[post.via].icon}
              alt={VIA_MAP[post.via].name}
            />

            <div className="text-xs text-muted-foreground">
              {post.publishDate.toLocaleString(DEFAULT_LOCALE, {
                dateStyle: 'medium',
              })}
            </div>

            <div className="text-xs text-muted-foreground">
              via {VIA_MAP[post.via].name}
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
