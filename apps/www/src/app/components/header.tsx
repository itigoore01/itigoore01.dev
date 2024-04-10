import { cn } from '@itigoore01.dev/ui/utils';
import { HeaderLink } from './header-link';

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
}: React.ComponentPropsWithoutRef<typeof HeaderLink<RouteType>>) {
  return (
    <HeaderLink
      className={cn('data-[active]:font-medium', className)}
      {...props}
    />
  );
}
