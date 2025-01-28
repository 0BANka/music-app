import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Track } from '../../track/entities/track.entity';

export default class TrackSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('SET foreign_key_checks = 0;');
    await dataSource.query('TRUNCATE TABLE `track`;');
    await dataSource.query('SET foreign_key_checks = 1;');

    const trackFactory = factoryManager.get(Track);
    await trackFactory.saveMany(2);
  }
}
