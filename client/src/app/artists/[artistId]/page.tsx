'use client';

import { use } from 'react';
import { AlbumsList } from '@/components/AlbumsList/AlbumsList';

export default function Home({
  params,
}: {
  params: Promise<{ artistId: string }>;
}) {
  const { artistId } = use(params);

  return (
    <>
      <AlbumsList artistId={artistId} />
    </>
  );
}
