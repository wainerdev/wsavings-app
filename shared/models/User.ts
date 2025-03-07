export interface User {
  id: number;
  email: string;
  password: string;
  fullName: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}


export type ListOfUsers = User[];

export type UserDto = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'balance'>;