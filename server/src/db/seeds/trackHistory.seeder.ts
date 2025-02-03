import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { TrackHistory } from '../../track-history/entities/track-history.entity';

export default class TrackHistorySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('SET foreign_key_checks = 0;');
    await dataSource.query('TRUNCATE TABLE `track_history`;');

    const trackHistoryFactory = factoryManager.get(TrackHistory);
    await trackHistoryFactory.saveMany(2);
    await dataSource.query('SET foreign_key_checks = 1;');
  }
}
