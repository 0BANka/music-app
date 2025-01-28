import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Album } from '../../album/entities/album.entity';

export default class AlbumSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('SET foreign_key_checks = 0;');
    await dataSource.query('TRUNCATE TABLE `album`;');
    await dataSource.query('SET foreign_key_checks = 1;');

    const albumFactory = factoryManager.get(Album);
    await albumFactory.saveMany(2);
  }
}
