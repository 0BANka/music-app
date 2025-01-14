import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
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

    return _.omit(user, ['password', 'token']);
  }
}
