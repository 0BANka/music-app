import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import * as _ from 'lodash';
import { User } from './entities/user.entity';
import { RegisterSignUserDto } from './dto/register-sign-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(registerSignUserDto: RegisterSignUserDto) {
    registerSignUserDto.password = await argon2.hash(
      registerSignUserDto.password,
    );
    await this.usersRepository.save(registerSignUserDto);

    const user = await this.usersRepository.findOne({
      where: { username: registerSignUserDto.username },
    });
    user.generateToken();

    const userWithToken = await this.usersRepository.save(user);
    return _.omit(userWithToken, 'password');
  }

  async signIn(registerSignUserDto: RegisterSignUserDto) {
    const user = await this.usersRepository.findOne({
      where: { username: registerSignUserDto.username },
    });

    if (!user) {
      throw new NotFoundException('Invalid user name or password');
    }
    const isMatchPassword = await argon2.verify(
      user.password,
      registerSignUserDto.password,
    );

    if (!isMatchPassword) {
      throw new NotFoundException('Invalid user name or password');
    }
    user.generateToken();
    const userWithToken = await this.usersRepository.save(user);

    return _.omit(userWithToken, 'password');
  }

  getUserByToken(token: string) {
    return this.usersRepository.findOne({
      where: { token },
    });
  }

  async logoutUser(token: string) {
    const user = await this.getUserByToken(token);
    if (!user) {
      throw new ForbiddenException();
    }

    user.generateToken();
    await this.usersRepository.save(user);

    return;
  }
}
