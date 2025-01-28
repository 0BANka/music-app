import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Artist } from '../../artist/entities/artist.entity';

export default class ArtistSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('SET foreign_key_checks = 0;');
    await dataSource.query('TRUNCATE TABLE `artist`;');
    await dataSource.query('SET foreign_key_checks = 1;');

    const artistFactory = factoryManager.get(Artist);
    await artistFactory.saveMany(2);
  }
}
