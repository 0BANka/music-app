import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Artist } from '../../artist/entities/artist.entity';

export const artistFactory = setSeederFactory(Artist, async () => {
  const artist = new Artist();
  artist.name = faker.music.artist();
  artist.info = faker.person.bio();
  artist.photo = faker.image.urlPicsumPhotos();
  artist.isPublish = true;
  artist.user = String(faker.number.int({ min: 1, max: 2 }));

  return artist;
});
