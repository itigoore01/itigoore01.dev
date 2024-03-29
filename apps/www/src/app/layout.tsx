import { cn } from '@itigoore01.dev/ui/utils';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Noto_Sans_JP as FontSans } from 'next/font/google';
import { Footer } from './components/footer';
import { Header } from './components/header';
import './globals.css';

const inter = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'itigoore01.dev',
  description: 'Personal website of shota',
} satisfies Metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
        )}
      >
        <Header />
        {children}
        <Footer />

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
