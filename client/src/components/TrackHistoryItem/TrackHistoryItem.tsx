import { ITrackHistory } from '@/interfaces/ITrackHistory';

import './TrackHistoryItem.sass';

interface Props {
  trackHistoryItem: ITrackHistory;
}

export function TrackHistoryItem({ trackHistoryItem }: Props) {
  const { track, artist, datetime } = trackHistoryItem;

  const formattedDateTime = formateDate(datetime);

  return (
    <div className="track-history">
      <div className="track-history-info">
        <div className="track-history-track">
          <span className="track-history-track-name">{track}</span>
          <span className="track-history-artist">{artist}</span>
        </div>
        <div className="track-history-datetime">{formattedDateTime}</div>
      </div>
    </div>
  );
}

export function formateDate(date: string): string {
  const formattedDate = new Date(date)
    .toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(',', '');
  return formattedDate;
}
