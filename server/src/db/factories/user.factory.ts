import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { User } from '../../user/entities/user.entity';

export const userFactory = setSeederFactory(User, async () => {
  const user = new User();
  user.username = faker.internet.email();
  user.password = await bcrypt.hash('111', 10);

  return user;
});
