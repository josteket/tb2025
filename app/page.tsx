import { Suspense } from "react";
import { PageClient } from "@/components/PageClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <PageClient />
    </Suspense>
  );
}
