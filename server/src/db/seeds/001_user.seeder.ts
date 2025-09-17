import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import * as argon2 from 'argon2';
import { User } from '../../user/entities/user.entity';
import { Role } from 'src/role/enums/role.enum';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('SET foreign_key_checks = 0;');
    await dataSource.query('TRUNCATE TABLE `user`;');

    const userRepo = dataSource.getRepository(User);

    const adminUser = new User();
    adminUser.username = 'Admin';
    adminUser.password = await argon2.hash('111');
    adminUser.role = Role.ADMIN;

    await userRepo.save(adminUser);

    const userFactory = factoryManager.get(User);
    await userFactory.save();
    await dataSource.query('SET foreign_key_checks = 1;');
  }
}
