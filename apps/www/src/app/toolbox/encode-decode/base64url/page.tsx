import { Metadata } from 'next';
import { Suspense } from 'react';
import { Base64URLEncodeDecodeForm } from './components/base64-url-encode-decode-form';

export const metadata = {
  title: 'Base64 URL Encode / Decode',
  description: 'Base64 URLのエンコード、デコードを行えます',
} satisfies Metadata;

export default function Base64Page() {
  return (
    <main className="container">
      <div className="p-4">
        <Suspense>
          <Base64URLEncodeDecodeForm />
        </Suspense>
      </div>
    </main>
  );
}
