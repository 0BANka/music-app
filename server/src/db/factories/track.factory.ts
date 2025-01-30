import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Track } from '../../track/entities/track.entity';

export const trackFactory = setSeederFactory(Track, async () => {
  const track = new Track();
  track.name = faker.music.songName();
  track.trackNumber = String(faker.number.int({ min: 1, max: 2 }));
  track.albumId = String(faker.number.int({ min: 1, max: 2 }));

  let trackMinutes = String(faker.number.int({ min: 2, max: 4 }));
  let trackSeconds = String(faker.number.int({ min: 0, max: 59 }));

  trackMinutes.length === 1 && (trackMinutes = '0' + trackMinutes);
  trackSeconds.length === 1 && (trackSeconds = '0' + trackSeconds);

  track.duration = trackMinutes + ':' + trackSeconds;
  track.youtubeLink = '';
  track.track = '';

  return track;
});
