import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateTrackHistoryDto {
  @Expose()
  @IsNotEmpty({ message: 'Укажите трек' })
  @IsNumberString({}, { message: 'Укажите корректный id трека' })
  track!: string;
}
