import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deletePost, fetchPosts } from '@/features/postsSlice';
import { IPost } from '@/interfaces/IPost';
import { PostItem } from '../PostItem/PostItem';
import { Loader } from '../Loader/Loader';

import './PostsList.sass';

export function PostsList() {
  const dispatch = useAppDispatch();
  const { posts, loading } = useAppSelector((state) => state.posts);
  const [data, setData] = useState<IPost[]>([]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (posts.length > 0) {
      setData(posts);
    } else {
      setData([]);
    }
  }, [posts]);

  const deleteElement = async (id: string) => {
    const result = await dispatch(deletePost(id));

    if (result.payload.id) {
      dispatch(fetchPosts());
      setData(posts);
    }
  };

  return (
    <div className="posts-list-container">
      <h1 className="posts-list-title">Posts</h1>

      {loading && <Loader />}
      {data.map((element) => (
        <PostItem
          key={element.id}
          post={element}
          onDelete={() => deleteElement(element.id)}
        />
      ))}
    </div>
  );
}
