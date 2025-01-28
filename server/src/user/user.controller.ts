import {
  Controller,
  Post,
  Body,
  ForbiddenException,
  InternalServerErrorException,
  Delete,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterSignUserDto } from './dto/register-sign-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() registerSignUserDto: RegisterSignUserDto) {
    try {
      return await this.userService.register(registerSignUserDto);
    } catch (e: any) {
      if ((e as { code: string }).code === 'ER_DUP_ENTRY') {
        throw new ForbiddenException(
          'Пользователь с таким именем уже существует',
        );
      } else {
        throw new InternalServerErrorException('Что-то пошло не так');
      }
    }
  }

  @Post('sessions')
  signIn(@Body() registerSignUserDto: RegisterSignUserDto) {
    return this.userService.signIn(registerSignUserDto);
  }

  @Delete('logout')
  async logout(@Headers() headers: { authorization: string }) {
    if (!headers.authorization) {
      return;
    }
    const user = await this.userService.getUserByToken(headers.authorization);
    if (!user) {
      throw new ForbiddenException();
    }
    user.generateToken();
    return;
  }
}
