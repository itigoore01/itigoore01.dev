// @vitest-environment happy-dom

import { cleanup, render } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import { LinkWithActive } from './link-with-active-state';

const { usePathname } = vi.hoisted(() => ({
  usePathname: vi.fn(),
}));

vi.mock('next/navigation', () => {
  return {
    usePathname,
  };
});

afterEach(() => {
  cleanup();
});

test('exists data-active attribute', () => {
  usePathname.mockReturnValue('/');
  const result = render(<LinkWithActive href="/">Link</LinkWithActive>);
  expect(result.getByRole('link').hasAttribute('data-active')).toBe(true);

  result.rerender(
    <LinkWithActive href="/" activeStrategy="startsWith">
      Link
    </LinkWithActive>,
  );
  expect(result.getByRole('link').hasAttribute('data-active')).toBe(true);

  usePathname.mockReturnValue('/path/slug');
  result.rerender(
    <LinkWithActive
      href="/"
      activeStrategy={{ strategy: 'startsWith', value: '/path' }}
    >
      Link
    </LinkWithActive>,
  );
  expect(result.getByRole('link').hasAttribute('data-active')).toBe(true);
});

test('not exists data-active attribute', () => {
  usePathname.mockReturnValue('/path');
  const result = render(<LinkWithActive href="/">Link</LinkWithActive>);
  expect(result.getByRole('link').hasAttribute('data-active')).toBe(false);

  usePathname.mockReturnValue('/toolbox');
  result.rerender(
    <LinkWithActive href="/posts/page/1" activeStrategy="startsWith">
      Link
    </LinkWithActive>,
  );
  expect(result.getByRole('link').hasAttribute('data-active')).toBe(false);
});
