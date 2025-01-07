import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAlbumDto {
  @Expose()
  @IsNotEmpty({ message: 'Укажите имя исполнителя' })
  @IsString({ message: 'Имя исполнителя должно быть строкой' })
  name!: string;

  @Expose()
  @IsNotEmpty({ message: 'Укажите исполнителя альбома' })
  @IsNumberString({}, { message: 'Укажите корректный id исполнителя' })
  categoryId!: string;

  @Expose()
  @IsNotEmpty({ message: 'Укажите год выпуска альбома' })
  @IsNumberString({}, { message: 'Укажите корректный год выпуска' })
  year!: string;

  @Expose()
  @IsOptional()
  image?: Express.Multer.File;
}
