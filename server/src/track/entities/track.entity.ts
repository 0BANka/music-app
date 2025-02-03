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
  trackNumber: string;

  @Column()
  name: string;

  @ManyToOne(() => Album)
  @JoinColumn({ name: 'albumId' })
  album: Album;

  @Column()
  albumId: string;

  @Column()
  duration: string;

  @Column({ default: 0 })
  isPublish: boolean;

  @Column({ nullable: true })
  youtubeLink?: string;

  @Column({ nullable: true })
  track?: string;
}
