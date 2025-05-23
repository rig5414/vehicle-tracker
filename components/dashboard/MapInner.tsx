'use client';

import dynamic from 'next/dynamic';

// Dynamically import the map component with no SSR to prevent initialization issues
const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-gray-100 flex items-center justify-center rounded-lg">
      <div className="text-gray-500">Loading map...</div>
    </div>
  ),
});

export default function MapInner() {
  return (
    <div className="h-[400px] w-full">
      <LeafletMap />
    </div>
  );
}