import { notFound } from 'next/navigation';
import { safeParse, type BaseSchema } from 'valibot';

export function safeParseOrNotFound<T extends BaseSchema>(
  schema: T,
  input: unknown,
) {
  const result = safeParse(schema, input, {
    abortEarly: true,
    abortPipeEarly: true,
  });

  if (!result.success) {
    notFound();
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result.output;
}
