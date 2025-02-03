import { User } from 'src/user/entities/user.entity';
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

  @Column({ default: 0 })
  isPublish: boolean;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  userId: User;

  @Column()
  user: string;
}
