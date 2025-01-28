import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { TrackHistory } from '../../track-history/entities/track-history.entity';

export const trackFactory = setSeederFactory(TrackHistory, async () => {
  const trackHistory = new TrackHistory();
  trackHistory.user = String(faker.number.int({ min: 1, max: 2 }));
  trackHistory.track = String(faker.number.int({ min: 1, max: 2 }));
  trackHistory.datetime = faker.date
    .between({
      from: new Date('2024-01-01'),
      to: new Date(),
    })
    .toISOString();

  return trackHistory;
});
