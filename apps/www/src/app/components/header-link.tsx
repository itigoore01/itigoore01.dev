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

export function HeaderLink<RouteType>({
  href,
  activeStrategy = 'equals',
  ...props
}: Props<RouteType>) {
  const pathname = usePathname();

  const strategyFn =
    ACTIVE_STRATEGIES[
      typeof activeStrategy === 'object'
        ? activeStrategy.strategy
        : activeStrategy
    ];

  const active = strategyFn(
    typeof activeStrategy === 'object'
      ? activeStrategy.value
      : normalizeHref(href),
    pathname,
  );

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
