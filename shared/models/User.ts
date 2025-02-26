export interface User {
  id: number;
  email: string;
  password: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
}


export type ListOfUsers = User[];

export type UserDto = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;