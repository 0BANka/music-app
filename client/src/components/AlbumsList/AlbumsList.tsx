import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { IArtist } from '@/interfaces/IArtist';
import { fetchArtists } from '@/features/artistsSlice';
import { ArtistItem } from '../ArtistItem/ArtistItem';
import { Loader } from '../Loader/Loader';

import './AlbumsList.sass';

export function AlbumsList() {
  const dispatch = useAppDispatch();
  const { albums, loading } = useAppSelector((state) => state.albums);
  const [data, setData] = useState<IArtist[]>([]);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  useEffect(() => {
    if (artists.length > 0) {
      setData(artists);
    } else {
      setData([]);
    }
  }, [artists]);

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
