import Image from 'next/image';
import Link from 'next/link';
import { Badge } from 'antd';
import { IAlbum } from '@/interfaces/IAlbum';

import './AlbumItem.sass';

interface Props {
  album: IAlbum;
}

export function AlbumItem({ album }: Props) {
  const { id, name, image, year, numberOfTracks, artist, isPublish } = album;

  let albumImage = '';

  if (image) {
    albumImage = `${process.env.SERVER_URL}/uploads/${image}`;
  }

  function renderAlbum() {
    return (
      <div className="album">
        <div className="album-image-container">
          <Image
            loader={() => (image?.match(/^https/) ? image : albumImage)}
            src={image?.match(/^https/) ? image : albumImage}
            alt={name}
            width={200}
            height={200}
            className="album-image"
          />
        </div>
        <div className="album-content">
          <h2 className="album-title">{name}</h2>
          <div className="album-actions">
            <div className="album-info">
              <p className="album-date">{year} year</p>
              <p className="album-tracks">{numberOfTracks} tracks</p>
              <Link
                href={`/artists/${artist?.id}/albums/${id}`}
                className="open-album-btn"
              >
                Open album &gt;&gt;
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {!isPublish ? (
        <Badge.Ribbon text="Unpublished">{renderAlbum()}</Badge.Ribbon>
      ) : (
        renderAlbum()
      )}
    </>
  );
}
