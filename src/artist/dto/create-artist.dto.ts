import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArtistDto {
  @Expose()
  @IsNotEmpty({ message: 'Укажите имя исполнителя' })
  @IsString({ message: 'Имя исполнителя должно быть строкой' })
  name!: string;

  @Expose()
  @IsOptional()
  photo?: Express.Multer.File;

  @Expose()
  @IsNotEmpty({ message: 'Укажите информацию о исполнителе' })
  @IsString({ message: 'Информация о исполнителе должна быть строкой' })
  info!: string;
}
