import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { User } from './entities/user.entity';
import { RegisterSignUserDto } from './dto/register-sign-user.dto';

@Injectable()
export class UserService {
  private saltRounds = 10;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(registerSignUserDto: RegisterSignUserDto) {
    const salt = await bcrypt.genSalt(this.saltRounds);
    registerSignUserDto.password = await bcrypt.hash(
      registerSignUserDto.password,
      salt,
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
    const isMatchPassword = await bcrypt.compare(
      registerSignUserDto.password,
      user.password,
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
