export interface IAlbum {
  id: string;
  name: string;
  year: string;
  numberOfTracks?: number;
  image?: string;
  artist: {
    id: string;
    name: string;
  };
}
