import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Loader } from '../Loader/Loader';
import { IComment } from '@/interfaces/IComment';
import { createComment, fetchComments } from '../../features/commentsSlice';

import './CommentForm.sass';

interface Props {
  newsId: string;
}

export function CommentForm({ newsId }: Props) {
  const dispatch = useAppDispatch();
  const [elementForm, setElementForm] = useState<Omit<IComment, 'id'>>({
    newsId: newsId,
    comment: '',
    author: '',
  });
  const [error, setError] = useState('');
  const { loading } = useAppSelector((state) => state.comments);

  const clearForm = () => {
    setElementForm({ newsId: newsId, comment: '', author: '' });
    setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await dispatch(
      createComment({
        newsId: String(newsId),
        comment: elementForm.comment.trim(),
        author: elementForm.author?.trim(),
      }),
    );

    if (response.payload.id) {
      clearForm();
      dispatch(fetchComments(newsId));
    } else {
      if (response.payload.length > 1) {
        setError(response.payload.join(', '));
      } else {
        setError(response.payload);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h2 className="comment-title">Add comment</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Enter the name"
          value={elementForm.author}
          onChange={(e) =>
            setElementForm({ ...elementForm, author: e.target.value })
          }
        />
      </div>
      <div className="form-group">
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          value={elementForm.comment}
          onChange={(e) =>
            setElementForm({ ...elementForm, comment: e.target.value })
          }
          placeholder="Enter the comment"
          required
        />
      </div>
      <button type="submit" className="comment-button">
        Add
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}
