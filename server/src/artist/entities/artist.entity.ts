import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  info: string;

  @Column({ default: 0 })
  isPublish: boolean;

  @Column({ nullable: true })
  photo?: string;
}
