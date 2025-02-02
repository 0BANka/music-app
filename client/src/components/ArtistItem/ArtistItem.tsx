import Image from 'next/image';
import Link from 'next/link';
import { IArtist } from '@/interfaces/IArtist';

import './ArtistItem.sass';

interface Props {
  artist: IArtist;
}

export function ArtistItem({ artist }: Props) {
  const { id, name, photo } = artist;

  let artistPhoto = '';

  if (photo) {
    artistPhoto = `${process.env.SERVER_URL}/uploads/${photo}`;
  }

  return (
    <div className="artist">
      <div className="artist-image-container">
        <Image
          loader={() => (photo?.match(/^https/) ? photo : artistPhoto)}
          src={photo?.match(/^https/) ? photo : artistPhoto}
          alt={name}
          width={200}
          height={200}
          className="artist-image"
        />
      </div>
      <div className="artist-content">
        <h2 className="artist-title">{name}</h2>
        <div className="artist-actions">
          <div className="artist-info">
            <Link href={`/artists/${id}`} className="open-artist-btn">
              Open artist &gt;&gt;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
