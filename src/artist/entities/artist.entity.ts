import { Category } from 'src/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  info: string;

  @Column({ nullable: true })
  photo?: string;

  // @ManyToOne(() => Category)
  // @JoinColumn({ name: 'categoryId' })
  // category: Category;

  // @Column({ nullable: true })
  // categoryId?: string;
}
