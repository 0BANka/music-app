import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAlbums } from '@/features/albumsSlice';
import { IAlbum } from '@/interfaces/IAlbum';
import { AlbumItem } from '../AlbumItem/AlbumItem';
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
    if (albums.length > 0 && Array.isArray(albums)) {
      setData(albums);
    } else {
      setData([]);
    }
  }, [albums]);

  return (
    <div className="container">
      <div className="albums-list-container">
        <h1 className="albums-list-title">Albums</h1>
        <h2 className="albums-artist-title">
          {albums.length && !loading ? albums[0].artist.name : ''}
        </h2>
        {loading && <Loader />}
        {data.length > 0 && !loading ? (
          data.map((element, index) => (
            <AlbumItem key={index} album={element} />
          ))
        ) : (
          <>
            <h3>No albums found.</h3>
          </>
        )}
      </div>
    </div>
  );
}
