export function encodeBase64URL(text: string) {
  const encoder = new TextEncoder();

  const charCodes = encoder.encode(text);

  return btoa(String.fromCharCode(...charCodes))
    .replaceAll('=', '')
    .replaceAll('+', '-')
    .replaceAll('/', '_');
}
