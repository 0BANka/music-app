export interface ITrack {
  id: string;
  trackNumber: string;
  name: string;
  duration: string;
  album: {
    id: string;
    name: string;
    artist: {
      id: string;
      name: string;
    };
  };
}
