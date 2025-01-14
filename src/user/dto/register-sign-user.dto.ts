import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @Expose()
  @IsNotEmpty({ message: 'Укажите пароль' })
  @IsString({ message: 'Пароль должен быть строкой' })
  password: string;

  @Expose()
  @IsString({ message: 'Имя пользователя должен быть строкой' })
  @IsNotEmpty({ message: 'Укажите имя пользователя' })
  username: string;
}
