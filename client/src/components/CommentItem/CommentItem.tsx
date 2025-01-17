import { IComment } from '@/interfaces/IComment';

import './CommentItem.sass';

interface Props {
  comment: IComment;
  onDelete: (id: string) => void;
}

export function CommentItem({ comment, onDelete }: Props) {
  return (
    <div className="comment">
      <div className="comment-content">
        <div className="comment-text">
          <strong>{comment.author}</strong>: {comment.comment}
        </div>
        <div className="comment-delete-div">
          <button
            className="delete-comment"
            onClick={() => onDelete(comment.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
