import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../../user/entities/user.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('SET foreign_key_checks = 0;');
    await dataSource.query('TRUNCATE TABLE `user`;');
    await dataSource.query('SET foreign_key_checks = 1;');

    const userFactory = factoryManager.get(User);
    await userFactory.saveMany(2);
  }
}
