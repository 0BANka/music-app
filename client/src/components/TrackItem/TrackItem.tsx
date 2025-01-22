import { ITrack } from '@/interfaces/ITrack';

import './TrackItem.sass';

interface Props {
  track: ITrack;
  onClickTrack: (id: string) => void;
}

export function TrackItem({ track, onClickTrack }: Props) {
  const { trackNumber, name, duration, id } = track;

  return (
    <div className="track" onClick={() => onClickTrack(id)}>
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
