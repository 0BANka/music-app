'use client';
import { PostDetail } from '@/components/PostDetail/PostDetail';
import { use } from 'react';

export default function Home({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <>
      <PostDetail postId={id} />
    </>
  );
}
