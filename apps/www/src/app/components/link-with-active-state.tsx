'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type ActiveStrategy = 'equals' | 'startsWith';

type Props<RouteType> = React.ComponentPropsWithoutRef<
  typeof Link<RouteType>
> & {
  activeStrategy?:
    | ActiveStrategy
    | {
        strategy: ActiveStrategy;
        value: string;
      };
};

const ACTIVE_STRATEGIES = {
  equals: (href, pathname) => href === pathname,
  startsWith: (href, pathname) => pathname.startsWith(href),
} satisfies Record<ActiveStrategy, (href: string, pathname: string) => boolean>;

export function useLinkActiveState<RouteType>(
  href: React.ComponentProps<typeof Link<RouteType>>['href'],
  activeStrategy:
    | ActiveStrategy
    | {
        strategy: ActiveStrategy;
        value: string;
      },
) {
  const pathname = usePathname();

  const strategyFn =
    ACTIVE_STRATEGIES[
      typeof activeStrategy === 'object'
        ? activeStrategy.strategy
        : activeStrategy
    ];

  return strategyFn(
    typeof activeStrategy === 'object'
      ? activeStrategy.value
      : normalizeHref(href),
    pathname,
  );
}

export function LinkWithActive<RouteType>({
  href,
  activeStrategy = 'equals',
  ...props
}: Props<RouteType>) {
  const active = useLinkActiveState(href, activeStrategy);

  return <Link href={href} data-active={active || undefined} {...props} />;
}

function normalizeHref<RouteType>(href: Props<RouteType>['href']) {
  if (typeof href === 'object') {
    if (href.pathname == null) {
      throw new Error('href.pathname is null or undefined');
    }

    return href.pathname;
  }

  return href;
}
