import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @Expose()
  @IsNotEmpty({ message: 'Продукт не может быть создан без заголовка' })
  @IsString({ message: 'Заголовок продукта должен быть строкой' })
  title!: string;

  @Expose()
  @IsOptional()
  description?: string;

  @Expose()
  @IsNotEmpty({ message: 'Укажите цену продукта' })
  @IsNumberString({}, { message: 'Укажите корректную цену' })
  price!: number;

  @Expose()
  @IsOptional()
  image?: Express.Multer.File;

  @Expose()
  @IsNotEmpty({ message: 'Укажите категорию продукта' })
  @IsNumberString({}, { message: 'Укажите корректную категорию' })
  categoryId: string;
}
