import { User } from '../../user/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';

export const userFactory = setSeederFactory(User, async () => {
  const user = new User();
  user.username = faker.internet.email();
  user.password = '111';

  return user;
});
