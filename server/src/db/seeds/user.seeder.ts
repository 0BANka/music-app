import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/role/enums/role.enum';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('SET foreign_key_checks = 0;');
    await dataSource.query('TRUNCATE TABLE `user`;');
    await dataSource.query('SET foreign_key_checks = 1;');

    const userFactory = factoryManager.get(User);
    await userFactory.save();

    const userRepo = dataSource.getRepository(User);

    const adminUser = new User();
    adminUser.username = 'Admin';
    adminUser.password = await bcrypt.hash('111', 10);
    adminUser.role = Role.ADMIN;

    await userRepo.save(adminUser);
  }
}
