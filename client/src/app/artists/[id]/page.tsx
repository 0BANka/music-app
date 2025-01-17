'use client';

import { use } from 'react';
import { AlbumsList } from '@/components/AlbumsList/AlbumsList';

export default function Home({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <>
      <AlbumsList artistId={id} />
    </>
  );
}
