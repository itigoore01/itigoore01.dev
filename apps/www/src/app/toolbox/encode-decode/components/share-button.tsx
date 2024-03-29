'use client';

import { Button } from '@itigoore01.dev/ui/button';
import { useEffect, useState } from 'react';
import { EncodeDecodeMode } from './encode-decode-mode';

interface Props {
  mode: EncodeDecodeMode;
  text: string;
}

export function ShareButton({ mode, text }: Props) {
  const [lastCopiedAt, setLastCopiedAt] = useState(0);

  useEffect(() => {
    if (!lastCopiedAt) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setLastCopiedAt(0);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [lastCopiedAt]);

  const showCopied = lastCopiedAt > 0;

  return (
    <Button
      className="w-24"
      onClick={() => {
        const url = new URL(location.href);

        url.searchParams.set('mode', mode);
        url.searchParams.set('text', text);

        if (location.href !== url.toString()) {
          history.replaceState(null, '', `?${url.searchParams.toString()}`);
        }

        void navigator.clipboard.writeText(url.toString());

        setLastCopiedAt(Date.now());
      }}
    >
      {showCopied ? 'Copied!' : 'Share'}
    </Button>
  );
}
