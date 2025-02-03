import { Artist } from 'src/artist/entities/artist.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Artist)
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  @Column()
  artistId: string;

  @Column()
  year: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ default: 0 })
  isPublish: boolean;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  userId: User;

  @Column()
  user: string;
}
