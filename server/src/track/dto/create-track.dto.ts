import { Optional } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateTrackDto {
  @Expose()
  @IsNotEmpty({ message: 'Укажите номер трека' })
  @IsNumberString({}, { message: 'Укажите корректный номер трека' })
  trackNumber!: string;

  @Expose()
  @IsNotEmpty({ message: 'Укажите название трека' })
  @IsString({ message: 'Название трека должно быть строкой' })
  name!: string;

  @Expose()
  @IsNotEmpty({ message: 'Укажите альбом' })
  @IsNumberString({}, { message: 'Укажите корректный id альбома' })
  albumId!: string;

  @Expose()
  @IsNotEmpty({ message: 'Укажите длительность трека' })
  duration!: string;

  @Expose()
  @Optional()
  @IsString({ message: 'Ссылка на youtube должна быть строкой' })
  youtubeLink?: string;

  @Expose()
  @Optional()
  track?: Express.Multer.File;
}
