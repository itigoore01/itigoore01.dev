import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-border bg-background">
      <div className="container flex h-14 items-center">
        <nav className="flex items-center gap-4">
          <Link href="/">Home</Link>
          <Link href="/toolbox">Toolbox</Link>
        </nav>
      </div>
    </header>
  );
}
