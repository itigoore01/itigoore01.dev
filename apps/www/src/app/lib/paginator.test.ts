import { expect, test } from 'vitest';
import { createPaginator } from './paginator';

test('returns last page', () => {
  const paginator = createPaginator(10);

  expect(paginator.getLastPage(createItems(10))).toBe(1);
  expect(paginator.getLastPage(createItems(11))).toBe(2);
  expect(paginator.getLastPage(createItems(9))).toBe(1);
  expect(paginator.getLastPage(createItems(1))).toBe(1);
  expect(paginator.getLastPage(createItems(0))).toBe(0);
});

test('returns items by page', () => {
  const paginator = createPaginator(10);

  // 0..9
  expect(paginator.getByPage(createItems(10), 1)).toStrictEqual(
    createItems(10),
  );
  expect(paginator.getByPage(createItems(10), 2)).toStrictEqual([]);
  // 10..19
  expect(paginator.getByPage(createItems(100), 2)).toStrictEqual(
    createItems(10, 10),
  );
});

test('returns pages', () => {
  const paginator = createPaginator(10);

  expect(paginator.getPages(createItems(10))).toStrictEqual([1]);
  expect(paginator.getPages(createItems(100))).toStrictEqual([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);
});

function createItems(length: number, offset = 0) {
  return Array.from({ length }).map((_, index) => index + offset);
}
