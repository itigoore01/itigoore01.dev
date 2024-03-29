export type EncodeDecodeMode = 'encode' | 'decode';

const MODE_LIST: EncodeDecodeMode[] = ['encode', 'decode'];

const MODE_SET = new Set(MODE_LIST);

export function isEncodeDecodeMode(value: unknown): value is EncodeDecodeMode {
  return (MODE_SET as Set<unknown>).has(value);
}
