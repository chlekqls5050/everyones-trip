'use client'; // 클라이언트 전용

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export default function NotFound() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h1>Page Not Found</h1>
        {query && <p>Search Query: {query}</p>}
      </div>
    </Suspense>
  );
}
