import { PostsList } from '@/components/PostsList/PostsList';
import Link from 'next/link';

import './PostsBuilder.sass';

export function PostsBuilder() {
  return (
    <div className="container">
      <div className="posts-builder-container">
        <div className="add-new-post-container">
          <Link href="/news/add" className="add-new-post">
            Add new post
          </Link>
        </div>
        <PostsList />
      </div>
    </div>
  );
}
