import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { nanoid } from 'nanoid';
import { Role } from 'src/role/enums/role.enum';

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

  @Column({ default: Role.USER })
  role: Role;

  generateToken() {
    this.token = nanoid();
  }
}
