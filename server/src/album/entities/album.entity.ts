import { Artist } from 'src/artist/entities/artist.entity';
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
}
