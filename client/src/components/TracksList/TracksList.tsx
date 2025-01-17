import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ITrack } from '@/interfaces/ITrack';
import { fetchTracks } from '@/features/tracksSlice';
import { Loader } from '../Loader/Loader';

import './TracksList.sass';

interface Props {
  albumId: string;
}

export function AlbumsList({ albumId }: Props) {
  const dispatch = useAppDispatch();
  const { tracks, loading } = useAppSelector((state) => state.tracks);
  const [data, setData] = useState<ITrack[]>([]);

  useEffect(() => {
    dispatch(fetchTracks(albumId));
  }, [dispatch, albumId]);

  useEffect(() => {
    if (tracks.length > 0) {
      setData(tracks);
    } else {
      setData([]);
    }
  }, [tracks]);

  return (
    <div className="container">
      <div className="tracks-list-container">
        <h1 className="tracks-list-title">Tracks</h1>
        <h2 className="tracks-artist-title">
          {tracks.length ? tracks[0].album.artist.name : ''}
        </h2>
        <h3 className="tracks-album-title">
          {tracks.length ? tracks[0].album.name : ''}
        </h3>
        {loading && <Loader />}
      </div>
    </div>
  );
}
