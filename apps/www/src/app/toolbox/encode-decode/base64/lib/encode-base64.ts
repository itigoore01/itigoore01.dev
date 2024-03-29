export function encodeBase64(text: string) {
  const encoder = new TextEncoder();

  const charCodes = encoder.encode(text);

  return btoa(String.fromCharCode(...charCodes));
}
