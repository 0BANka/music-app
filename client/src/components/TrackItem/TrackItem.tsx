import { ITrack } from '@/interfaces/ITrack';

import './TrackItem.sass';

interface Props {
  track: ITrack;
}

export function TrackItem({ track }: Props) {
  const { trackNumber, name, duration } = track;

  return (
    <div className="track">
      <div className="track-info">
        <div className="track-name-container">
          <span className="track-number">{trackNumber}</span>
          <span className="track-name">{name}</span>
        </div>
        <span className="track-duration">{duration}</span>
      </div>
    </div>
  );
}
