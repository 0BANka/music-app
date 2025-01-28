import { Artist } from '../../artist/entities/artist.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class ArtistSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const artistFactory = factoryManager.get(Artist);
    await artistFactory.saveMany(2);
  }
}
