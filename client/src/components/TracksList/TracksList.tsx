import { useEffect, useState } from 'react';
import { message } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ITrack } from '@/interfaces/ITrack';
import { fetchTracks } from '@/features/tracksSlice';
import {
  addTrackHistory,
  HistoryTrackRequest,
} from '@/features/tracksHistorySlice';
import { TrackItem } from '../TrackItem/TrackItem';
import { Loader } from '../Loader/Loader';

import './TracksList.sass';

interface Props {
  albumId: string;
}

export function TracksList({ albumId }: Props) {
  const dispatch = useAppDispatch();
  const { tracks, loading } = useAppSelector((state) => state.tracks);
  const { user } = useAppSelector((state) => state.user);
  const [data, setData] = useState<ITrack[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    dispatch(fetchTracks(albumId));
  }, [dispatch, albumId]);

  useEffect(() => {
    if (tracks.length > 0 && Array.isArray(tracks)) {
      setData(tracks);
    } else {
      setData([]);
    }
  }, [tracks]);

  const displaySuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Playing!',
    });
  };

  const displayError = () => {
    messageApi.open({
      type: 'error',
      content: 'You are not authorized',
    });
  };

  const onClickTrack = async (trackId: string) => {
    if (!user?.token) {
      displayError();
      return;
    }

    const track: HistoryTrackRequest = {
      track: trackId,
      token: user.token,
    };

    const result = await dispatch(addTrackHistory(track));

    if (result.payload) {
      displaySuccess();
    }
  };

  return (
    <>
      {contextHolder}
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
          {data.length > 0 ? (
            data.map((element) => (
              <TrackItem
                key={element.id}
                trackItem={element}
                onClickTrack={() => onClickTrack(element.id)}
              />
            ))
          ) : (
            <>
              <h3>No tracks found.</h3>
            </>
          )}
        </div>
      </div>
    </>
  );
}
