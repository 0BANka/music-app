import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAlbums } from '@/features/albumsSlice';
import { IAlbum } from '@/interfaces/IAlbum';
import { Loader } from '../Loader/Loader';

import './AlbumsList.sass';

interface Props {
  artistId: string;
}

export function AlbumsList({ artistId }: Props) {
  const dispatch = useAppDispatch();
  const { albums, loading } = useAppSelector((state) => state.albums);
  const [data, setData] = useState<IAlbum[]>([]);

  useEffect(() => {
    dispatch(fetchAlbums(artistId));
  }, [dispatch, artistId]);

  useEffect(() => {
    if (albums.length > 0) {
      setData(albums);
    } else {
      setData([]);
    }
  }, [albums]);

  return (
    <div className="container">
      <div className="artists-list-container">
        <h1 className="artists-list-title">Artists</h1>
        {loading && <Loader />}
        {data.map((element) => (
          <ArtistItem key={element.id} artist={element} />
        ))}
      </div>
    </div>
  );
}
