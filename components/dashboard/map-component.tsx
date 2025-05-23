'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/card';

// Dynamically import the MapInner component
const MapInner = dynamic(() => import('./MapInner'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-gray-100 flex items-center justify-center rounded-lg">
      <div className="text-gray-500">Loading map...</div>
    </div>
  ),
});

export function MapComponent() {
  return (
    <Card className="col-span-3">
      <Suspense fallback={
        <div className="h-[400px] w-full bg-gray-100 flex items-center justify-center rounded-lg">
          <div className="text-gray-500">Loading map...</div>
        </div>
      }>
        <MapInner />
      </Suspense>
    </Card>
  );
}