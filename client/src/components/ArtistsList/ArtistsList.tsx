import { Loader } from '../Loader/Loader';

import './ArtistsList.sass';

export function ArtistsList() {
  return (
    <div className="artists-list-container">
      <h1 className="artists-list-title">Artists</h1>

      {loading && <Loader />}
    </div>
  );
}
