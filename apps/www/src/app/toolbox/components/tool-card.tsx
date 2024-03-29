import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@itigoore01.dev/ui/card';
import type { Route } from 'next';
import Link from 'next/link';

interface Props {
  href: Route;
  title: string;
  description: string;
}

export function ToolCard({ href, title, description }: Props) {
  return (
    <Link href={href} className="grid">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
