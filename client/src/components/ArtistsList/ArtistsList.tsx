import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { IArtist } from '@/interfaces/IArtist';
import { fetchArtists } from '@/features/artistsSlice';
import { ArtistItem } from '../ArtistItem/ArtistItem';
import { Loader } from '../Loader/Loader';

import './ArtistsList.sass';

export function ArtistsList() {
  const dispatch = useAppDispatch();
  const { artists, loading } = useAppSelector((state) => state.artists);
  const [data, setData] = useState<IArtist[]>([]);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  useEffect(() => {
    if (artists.length > 0 && Array.isArray(artists)) {
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
        {data.length > 0 &&
          data.map((element) => (
            <ArtistItem key={element.id} artist={element} />
          ))}
      </div>
    </div>
  );
}
