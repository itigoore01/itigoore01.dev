import { Metadata } from 'next';
import { Suspense } from 'react';
import { Base64EncodeDecodeForm } from './components/base64-encode-decode-form';

export const metadata = {
  title: 'Base64 Encode / Decode',
  description: 'Base64のエンコード、デコードを行えます',
} satisfies Metadata;

export default function Base64Page() {
  return (
    <main className="container">
      <div className="p-4">
        <Suspense>
          <Base64EncodeDecodeForm />
        </Suspense>
      </div>
    </main>
  );
}
