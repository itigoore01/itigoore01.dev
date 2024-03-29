import { useState } from 'react';
import { EncodeDecodeMode } from './encode-decode-mode';

export type EncodeDecodeFn = (text: string) => string;

export interface UseEncodeDecodeFormProps {
  defaultMode?: EncodeDecodeMode;
  defaultText?: string;
  encode: EncodeDecodeFn;
  decode: EncodeDecodeFn;
}

export function useEncodeDecodeForm({
  encode,
  decode,
  defaultMode = 'encode',
  defaultText = '',
}: UseEncodeDecodeFormProps) {
  const MODE_FUNC_MAP = { encode, decode };

  const [mode, setMode] = useState<EncodeDecodeMode>(defaultMode);
  const [text, setText] = useState(defaultText);

  let result = '';
  let error;

  try {
    result = MODE_FUNC_MAP[mode](text);
  } catch (e) {
    error = e;
  }

  return {
    mode,
    text,
    setText,
    result,
    error,
    toggleMode: () => {
      setMode(
        (mode) =>
          (
            ({
              encode: 'decode',
              decode: 'encode',
            }) satisfies Record<EncodeDecodeMode, EncodeDecodeMode>
          )[mode],
      );

      setText(result);
    },
  };
}
