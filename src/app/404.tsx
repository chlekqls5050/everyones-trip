'use client';
import { useSearchParams } from 'next/navigation';

export default function NotFoundPage() {
  const searchParams = useSearchParams();
  const q = searchParams?.get('q') || '';

  return (
    <div>
      <p>404 Page: Search Query: {q}</p>
    </div>
  );
}
