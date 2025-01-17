import Link from 'next/link';
import Image from 'next/image';
import { IPost } from '@/interfaces/IPost';

import './PostItem.sass';

interface Props {
  post: IPost;
  onDelete: (id: string) => void;
}

export function PostItem({ post, onDelete }: Props) {
  const { id, title, image, datePublished } = post;

  const formattedDate = formateDate(datePublished);

  let postImage = '';

  if (image) {
    postImage = `${process.env.SERVER_URL}/uploads/${image}`;
  }

  return (
    <div className="post">
      <div className="post-image-container">
        <Image
          loader={() => postImage}
          src={postImage}
          alt={title}
          width={200}
          height={200}
          className="post-image"
        />
      </div>
      <div className="post-content">
        <h2 className="post-title">{title}</h2>
        <div className="post-actions">
          <div className="post-info">
            <p className="post-date">At: {formattedDate}</p>
            <Link href={`/news/${id}`} className="read-full-btn">
              Read Full Post &gt;&gt;
            </Link>
          </div>
          <div className="post-delete-div">
            <button className="delete-post" onClick={() => onDelete(id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function formateDate(date: string): string {
  const formattedDate = new Date(date)
    .toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(',', '');
  return formattedDate;
}
