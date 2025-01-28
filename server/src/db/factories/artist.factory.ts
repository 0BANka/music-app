import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Artist } from '../../artist/entities/artist.entity';

export const artistFactory = setSeederFactory(Artist, async () => {
  const artist = new Artist();
  artist.name = faker.person.fullName();
  artist.info = faker.person.bio();

  return artist;
});
