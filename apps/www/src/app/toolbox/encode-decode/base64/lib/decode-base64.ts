export function decodeBase64(text: string) {
  const decoder = new TextDecoder();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const charCodes = Uint8Array.from(atob(text), (v) => v.codePointAt(0)!);

  return decoder.decode(charCodes);
}
