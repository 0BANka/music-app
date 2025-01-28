import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Artist } from '../../artist/entities/artist.entity';

export const artistFactory = setSeederFactory(Artist, async () => {
  const artist = new Artist();
  artist.name = faker.music.artist();
  artist.info = faker.person.bio();
  artist.photo = 'no-photo-available.png';

  return artist;
});
