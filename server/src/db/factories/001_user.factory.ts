import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import * as argon2 from 'argon2';
import { User } from '../../user/entities/user.entity';

export const userFactory = setSeederFactory(User, async () => {
  const user = new User();
  user.username = faker.internet.username();
  user.password = await argon2.hash('111');

  return user;
});
