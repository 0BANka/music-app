import { Album } from 'src/album/entities/album.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Album)
  @JoinColumn({ name: 'albumId' })
  album: Album;

  @Column()
  albumId: string;

  @Column()
  duration: string;
}
