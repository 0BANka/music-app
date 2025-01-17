import { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearSelectedPost, fetchPostById } from '@/features/postsSlice';
import { IPost } from '@/interfaces/IPost';
import { formateDate } from '../PostItem/PostItem';

import './PostDetail.sass';
import { CommentsList } from '../CommentsList/CommentsList';
import { CommentForm } from '../CommentForm/CommentForm';

interface Props {
  postId: string;
}

export function PostDetail({ postId }: Props) {
  const { loading, selectedPost } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const [post, setPost] = useState<Omit<IPost, 'image'>>({
    id: '',
    title: '',
    content: '',
    datePublished: '',
  });

  useEffect(() => {
    dispatch(clearSelectedPost());
  }, [dispatch, postId]);

  useEffect(() => {
    if (!selectedPost.id) {
      dispatch(fetchPostById(postId));
    }

    if (selectedPost.id) {
      const formateDatePost = {
        id: selectedPost.id,
        title: selectedPost.title,
        content: selectedPost.content,
        datePublished: formateDate(selectedPost.datePublished),
      };
      setPost(formateDatePost);
    }
  }, [postId, dispatch, selectedPost]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="post-container">
        <div className="post-detail">
          <h1 className="post-detail-title">{post.title}</h1>
          <p className="post-detail-date">Created on: {post.datePublished}</p>
          <div className="post-detail-body">{post.content}</div>
        </div>
        <CommentsList newsId={postId} />
        <CommentForm newsId={postId} />
      </div>
    </div>
  );
}
