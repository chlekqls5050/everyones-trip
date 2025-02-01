'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export default function NotFound() {
    return (
        <div style={{ marginTop: "180px", textAlign: "center" }}>
            <Suspense fallback={<div>Loading...</div>}>
                <SearchParamsComponent />
            </Suspense>
        </div>
    );
}

function SearchParamsComponent() {
    const searchParams = useSearchParams();
    const query = searchParams?.get('query'); // 예시로 query 값을 가져오는 코드

    return (
        <div className="w-1200">
            <div>404 : NotFound</div>
            {query && <div>Query: {query}</div>}
        </div>
    );
}
