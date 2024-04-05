import { object, string } from 'valibot';

export const ParamsSchema = object({
  slug: string(),
});
