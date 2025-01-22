import { useEffect, useState } from 'react';
import { ITrackHistory } from '@/interfaces/ITrackHistory';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTracksHistory } from '@/features/tracksHistorySlice';
import { TrackHistoryItem } from '../TrackHistoryItem/TrackHistoryItem';
import { Loader } from '../Loader/Loader';

import './TracksHistoryList.sass';

export function TracksHistoryList() {
  const dispatch = useAppDispatch();
  const { tracks, loading } = useAppSelector((state) => state.tracksHistory);
  const { user } = useAppSelector((state) => state.user);
  const [data, setData] = useState<ITrackHistory[]>([]);

  useEffect(() => {
    if (user?.token) {
      dispatch(fetchTracksHistory(user.token));
    }
  }, [dispatch, user?.token]);

  useEffect(() => {
    if (tracks.length > 0 && Array.isArray(tracks)) {
      setData(tracks);
    } else {
      setData([]);
    }
  }, [tracks]);

  return (
    <div className="container">
      <div className="tracks-history-list-container">
        <h1 className="tracks-history-list-title">Tracks History</h1>
        {loading && <Loader />}
        {data.length > 0 &&
          data.map((element) => (
            <TrackHistoryItem
              key={element.datetime}
              trackHistoryItem={element}
            />
          ))}
      </div>
    </div>
  );
}
