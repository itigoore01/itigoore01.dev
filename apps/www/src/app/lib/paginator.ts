export function getLastPage(items: unknown[], perPage: number) {
  return Math.ceil(items.length / perPage);
}

export function getByPage<T>(items: T[], page: number, perPage: number) {
  const start = Math.max((page - 1) * perPage, 0);
  const end = start + perPage;

  return items.slice(start, end);
}

export function createPaginator(perPage: number) {
  return {
    getLastPage: (items: unknown[]) => getLastPage(items, perPage),
    getByPage: <T>(items: T[], page: number) => getByPage(items, page, perPage),
    getPages: (items: unknown[]) =>
      Array.from({ length: getLastPage(items, perPage) }).map((_, i) => i + 1),
  };
}
