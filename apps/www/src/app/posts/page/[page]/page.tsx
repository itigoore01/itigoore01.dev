import { safeParseOrNotFound } from '@/app/lib/safe-parse-or-not-found';
import { notFound } from 'next/navigation';
import { Input, integer, number, object, string, transform } from 'valibot';
import { createPaginator } from '../../../lib/paginator';
import { getPosts } from '../../lib/get-posts';
import {
  ExternalPostListItem,
  LocalPostListItem,
  PostList,
} from './components/post-list';
import { PostsPagination } from './components/posts-pagination';

const ParamsSchema = object({
  page: transform(string(), Number, number([integer()])),
});
const paginator = createPaginator(12);

interface Props {
  params: Input<typeof ParamsSchema>;
}

export async function generateStaticParams() {
  const allPosts = await getPosts();

  const pages = paginator.getPages(allPosts);

  return pages.map((page) => ({
    page: page.toString(),
  })) satisfies Props['params'][];
}

export default async function PostsPage({ params }: Props) {
  const { page } = safeParseOrNotFound(ParamsSchema, params);

  const allPosts = await getPosts();
  const posts = paginator.getByPage(allPosts, page);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div>
      <main className="container @container">
        <PostList>
          {posts.map((post) =>
            post.type === 'local' ? (
              <LocalPostListItem key={post.id} post={post} />
            ) : (
              <ExternalPostListItem key={post.id} post={post} />
            ),
          )}
        </PostList>
      </main>

      {paginator.getLastPage(allPosts) > 1 && (
        <PostsPagination
          className="mt-10"
          currentPage={page}
          pages={paginator.getPages(allPosts)}
          lastPage={paginator.getLastPage(allPosts)}
        />
      )}
    </div>
  );
}
