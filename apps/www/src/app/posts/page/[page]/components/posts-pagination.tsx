import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@itigoore01.dev/ui/pagination';
import Link from 'next/link';

interface Props {
  className?: string;
  currentPage: number;
  lastPage: number;
  pages: number[];
}

export function PostsPagination({
  className,
  currentPage,
  lastPage,
  pages,
}: Props) {
  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious asChild>
            <Link href={getHref(Math.max(currentPage - 1, 1))} />
          </PaginationPrevious>
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink asChild isActive={currentPage === page}>
              <Link href={getHref(page)}>{page}</Link>
            </PaginationLink>
          </PaginationItem>
        ))}

        {pages.length < lastPage && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext asChild>
            <Link href={getHref(Math.min(currentPage + 1, lastPage))} />
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function getHref(page: number) {
  return `/posts/page/${page}` as const;
}
