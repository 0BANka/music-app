import {
  Controller,
  Post,
  Body,
  ForbiddenException,
  InternalServerErrorException,
  Delete,
  Headers,
  UseGuards,
  Get,
} from '@nestjs/common';
import { RegisterSignUserDto } from './dto/register-sign-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/role/enums/role.enum';

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
  @UseGuards(AuthGuard)
  async logout(@Headers() headers: { authorization: string }) {
    if (!headers.authorization) {
      return;
    }

    return this.userService.logoutUser(headers.authorization);
  }
}
