import { number, object, string, transform } from 'valibot';
import { expect, test } from 'vitest';
import { safeParseOrNotFound } from './safe-parse-or-not-found';

const TestSchema = object({
  id: transform(string(), (input) => Number(input), number()),
  name: string(),
});

test('returns parsed value', () => {
  expect(
    safeParseOrNotFound(TestSchema, {
      id: '1',
      name: 'name',
    }),
  ).toStrictEqual({
    id: 1,
    name: 'name',
  });
});

test('throws NEXT_NOT_FOUND', () => {
  expect(() => safeParseOrNotFound(TestSchema, {})).toThrow('NEXT_NOT_FOUND');
});
