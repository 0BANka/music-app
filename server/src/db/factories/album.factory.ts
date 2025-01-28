import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Album } from '../../album/entities/album.entity';

export const albumFactory = setSeederFactory(Album, async () => {
  const album = new Album();
  album.name = faker.music.album();
  album.artistId = String(
    faker.number.int({
      min: 1,
      max: 2,
    }),
  );
  album.year = faker.date
    .between({
      from: new Date('1990-01-01'),
      to: new Date(),
    })
    .getFullYear()
    .toString();
  album.image = 'no-photo-available.png';

  return album;
});
