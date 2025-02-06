"use client"; // 페이지 최상단에 추가

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function NotFoundPage() {
  const searchParams = useSearchParams();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>404 Page Not Found</div>
      <p>Query params: {searchParams.toString()}</p>
    </Suspense>
  );
}