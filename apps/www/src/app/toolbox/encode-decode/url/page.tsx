import { Metadata } from 'next';
import { Suspense } from 'react';
import { URLEncodeDecodeForm } from './components/url-encode-decode-form';

export const metadata = {
  title: 'URL Encode / Decode',
  description: 'URLのエンコード、デコードを行えます',
} satisfies Metadata;

export default function UrlPage() {
  return (
    <main className="container">
      <div className="p-4">
        <Suspense>
          <URLEncodeDecodeForm />
        </Suspense>
      </div>
    </main>
  );
}
