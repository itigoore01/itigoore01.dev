import { expect, test, vi } from 'vitest';
import { getGoogleFont } from './get-google-font';

test('returns font array buffer', async () => {
  const promise = getGoogleFont('Noto Sans JP', 400, 'test');

  await expect(promise).resolves.toBeInstanceOf(ArrayBuffer);
  await expect(promise.then((a) => a.byteLength)).resolves.toBeGreaterThan(0);
});

test('throws if failed to fetch font CSS', async () => {
  const promise = getGoogleFont('NOT_FOUND_FONT', 400, 'test');

  await expect(promise).rejects.toThrow('Failed to fetch CSS');
});

test('throws if font url not exists in CSS', async () => {
  vi.spyOn(global, 'fetch').mockResolvedValue(new Response(''));

  const promise = getGoogleFont('NOT_FOUND_FONT', 400, 'test');

  await expect(promise).rejects.toThrow('Font url not found in CSS');
});

test('throws if failed to fetch font', async () => {
  vi.spyOn(global, 'fetch')
    // font CSS response
    .mockResolvedValueOnce(
      new Response('src: url(https://localhost/not-found)'),
    )
    // font response
    .mockResolvedValueOnce(new Response(null, { status: 404 }));

  const promise = getGoogleFont('NOT_FOUND_FONT', 400, 'test');

  await expect(promise).rejects.toThrow('Failed to fetch font');
});
