import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createPost, setImageName } from '@/features/postsSlice';
import { ImageInput } from '../UI/ImageInput';
import { Loader } from '../Loader/Loader';

import './PostForm.sass';

interface NewPostState {
  title: string;
  content: string;
  datePublished: string;
  image?: File | null;
}

export function PostForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [elementForm, setElementForm] = useState<NewPostState>({
    title: '',
    content: '',
    datePublished: '',
    image: null,
  });
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const { loading } = useAppSelector((state) => state.posts);

  const clearForm = () => {
    setElementForm({ title: '', content: '', image: null, datePublished: '' });
    setError('');
    setImage(null);
    dispatch(setImageName(''));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    const datePublished = new Date().toISOString();

    const newPost: NewPostState = {
      title: elementForm.title.trim(),
      content: elementForm.content.trim(),
      image: image ? image : null,
      datePublished,
    };

    Object.entries(newPost).forEach(([key, value]) => {
      if (typeof value === 'object') {
        formData.append(key, value);
      } else {
        formData.append(key, `${value}`);
      }
    });

    const response = await dispatch(createPost(formData));

    if (response.payload.id) {
      clearForm();
      router.push(`/`);
    } else {
      if (response.payload.length > 1) {
        setError(response.payload.join(', '));
      } else {
        setError(response.payload);
      }
    }
  };

  const imageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.[0]) {
      const file: File = e.target.files[0];
      setImage(file);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>Add new post</h2>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          className="form-control"
          id="title"
          placeholder="Enter the title"
          value={elementForm.title}
          onChange={(e) =>
            setElementForm({ ...elementForm, title: e.target.value })
          }
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={elementForm.content}
          onChange={(e) =>
            setElementForm({ ...elementForm, content: e.target.value })
          }
          placeholder="Enter the content"
          required
        />
      </div>
      <div className="form-group">
        <ImageInput onChange={imageChangeHandler} name="image" />
      </div>
      <button type="submit" className="btn-action">
        Save
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}
