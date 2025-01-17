import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { nanoid } from 'nanoid';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  token?: string;

  generateToken() {
    this.token = nanoid();
  }
}
