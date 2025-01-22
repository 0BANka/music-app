import { ITrackHistory } from '@/interfaces/ITrackHistory';

import './TrackItem.sass';

interface Props {
  trackHistoryItem: ITrackHistory;
}

export function TrackHistoryItem({ trackHistoryItem }: Props) {
  const { track, artist, datetime } = trackHistoryItem;

  return (
    <div className="track-history">
      <div className="track-history-info">
        <div className="track-history-track">
          <span>{track}</span>
          <span>by {artist}</span>
        </div>
        <div className="track-history-datetime">{datetime}</div>
      </div>
    </div>
  );
}
