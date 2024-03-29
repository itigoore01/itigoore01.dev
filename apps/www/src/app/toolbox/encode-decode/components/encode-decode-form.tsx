import { Button } from '@itigoore01.dev/ui/button';
import { Label } from '@itigoore01.dev/ui/label';
import { Textarea } from '@itigoore01.dev/ui/textarea';
import { ArrowRightLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { EncodeDecodeMode, isEncodeDecodeMode } from './encode-decode-mode';
import { ShareButton } from './share-button';
import { EncodeDecodeFn, useEncodeDecodeForm } from './use-encode-decode-form';

const MODE_LABEL_MAP = {
  encode: 'エンコード',
  decode: 'デコード',
} satisfies Record<EncodeDecodeMode, string>;

interface Props {
  encode: EncodeDecodeFn;
  decode: EncodeDecodeFn;
}

export function EncodeDecodeForm({ encode, decode }: Props) {
  const searchParams = useSearchParams();
  const { mode, text, setText, result, toggleMode, error } =
    useEncodeDecodeForm({
      encode,
      decode,
      defaultMode: (() => {
        const mode = searchParams.get('mode');
        return isEncodeDecodeMode(mode) ? mode : 'encode';
      })(),
      defaultText: searchParams.get('text') ?? '',
    });

  return (
    <div className="grid gap-4">
      <div className="grid items-start gap-4 md:grid-cols-[1fr_auto_1fr]">
        <div className="grid gap-1.5">
          <Label htmlFor="inputText">入力</Label>
          <Textarea
            id="inputText"
            rows={10}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>

        <Button size="icon" className="place-self-center" onClick={toggleMode}>
          <ArrowRightLeft />
        </Button>

        <div className="grid gap-1.5">
          <Label htmlFor="resultTextarea">{MODE_LABEL_MAP[mode]}結果</Label>
          <Textarea id="resultTextarea" rows={10} readOnly value={result} />
          {typeof error === 'object' && (
            <p className="text-sm font-medium text-destructive">
              {String(error)}
            </p>
          )}
        </div>
      </div>

      <div>
        <ShareButton mode={mode} text={text} />
      </div>
    </div>
  );
}
