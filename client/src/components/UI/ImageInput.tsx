import { ChangeEvent, MouseEventHandler, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import './ImageInput.sass';
import { setImageName } from '@/features/postsSlice';

interface Props {
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function ImageInput({ name, onChange }: Props) {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const { imageName } = useAppSelector((state) => state.posts);

  const activeInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.[0]?.name) {
      dispatch(setImageName(e.target.files[0].name));
    } else {
      dispatch(setImageName(''));
    }

    onChange(e);
  };

  return (
    <>
      <input type="file" name={name} onChange={onFileChange} ref={inputRef} />
      <div className="image-input">
        <div className="image-input-text">
          <label htmlFor="Image">Image:</label>
          <input
            type="text"
            name="Image"
            value={imageName}
            disabled
            onClick={activeInput}
          />
          <div className="image-input-button">
            <button onClick={activeInput}>Browse</button>
          </div>
        </div>
      </div>
    </>
  );
}
