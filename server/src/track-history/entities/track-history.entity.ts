import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TrackHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user' })
  userId: User;

  @Column()
  user: string;

  @ManyToOne(() => Track)
  @JoinColumn({ name: 'track' })
  trackId: Track;

  @Column()
  track: string;

  @Column()
  datetime: string;
}
