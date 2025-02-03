export interface IUser {
  id: string;
  username: string;
  password: string;
  token?: string;
  role: Role;
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}
