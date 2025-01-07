import { Expose } from 'class-transformer';

export class CreateCategoryDto {
  @Expose()
  title!: string;

  @Expose()
  description?: string;
}
