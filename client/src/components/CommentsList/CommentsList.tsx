import { IComment } from '@/interfaces/IComment';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { deleteComment, fetchComments } from '@/features/commentsSlice';
import { CommentItem } from '../CommentItem/CommentItem';

interface Props {
  newsId: string;
}

export function CommentsList({ newsId }: Props) {
  const dispatch = useAppDispatch();
  const { comments, loading } = useAppSelector((state) => state.comments);
  const [data, setData] = useState<IComment[]>([]);

  useEffect(() => {
    dispatch(fetchComments(newsId));
  }, [dispatch, newsId]);

  useEffect(() => {
    if (comments.length > 0) {
      const validateComments = comments.filter((item) => !Array.isArray(item));
      setData(validateComments);
    } else {
      setData([]);
    }
  }, [comments]);

  const deleteElement = (id: string) => {
    dispatch(deleteComment(id));
    dispatch(fetchComments(newsId));
    const validateComments = comments.filter((item) => !Array.isArray(item));
    setData(validateComments);
  };

  return (
    <div>
      <h2>Comments</h2>

      {loading && <Loader />}
      {data.map((element) => (
        <CommentItem
          key={element.id}
          comment={element}
          onDelete={() => deleteElement(element.id)}
        />
      ))}
    </div>
  );
}
