export function decodeBase64URL(text: string) {
  const decoder = new TextDecoder();

  const charCodes = Uint8Array.from(
    atob(text.replaceAll('-', '+').replaceAll('_', '/')),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    (v) => v.codePointAt(0)!,
  );

  return decoder.decode(charCodes);
}
