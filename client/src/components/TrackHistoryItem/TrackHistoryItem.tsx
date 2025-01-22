import { ITrack } from '@/interfaces/ITrack';

import './TrackItem.sass';

interface Props {
  track: ITrack;
}

export function TrackHistoryItem({ track }: Props) {
  return <div className="track-history"></div>;
}
