import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { IArtist } from '@/interfaces/IArtist';
import { Loader } from '../Loader/Loader';

import './ArtistsList.sass';
import { useState } from 'react';

export function ArtistsList() {
  const dispatch = useAppDispatch();
  const { artists, loading } = useAppSelector((state) => state.artists);
  const [data, setData] = useState<IArtist[]>([]);

  return (
    <div className="artists-list-container">
      <h1 className="artists-list-title">Artists</h1>

      {loading && <Loader />}
    </div>
  );
}
