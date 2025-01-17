'use client';

import { use } from 'react';
import { TracksList } from '@/components/TracksList/TracksList';

export default function Home({
  params,
}: {
  params: Promise<{ albumId: string }>;
}) {
  const { albumId } = use(params);

  return (
    <>
      <TracksList albumId={albumId} />
    </>
  );
}
