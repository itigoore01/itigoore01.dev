import { cn } from '@itigoore01.dev/ui/utils';
import { LinkWithActive } from './link-with-active-state';

export function Header() {
  return (
    <header>
      <nav>
        <HeaderNavItem href="/">Top</HeaderNavItem>
        <HeaderNavItem
          href="/posts/page/1"
          activeStrategy={{
            strategy: 'startsWith',
            value: '/posts/',
          }}
        >
          Posts
        </HeaderNavItem>
      </nav>
    </header>
  );
}

function HeaderNavItem<RouteType>({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof LinkWithActive<RouteType>>) {
  return (
    <LinkWithActive
      className={cn('data-[active]:font-medium', className)}
      {...props}
    />
  );
}
