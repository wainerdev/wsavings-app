import { User } from '@/shared/models/User';

export interface Category {
  id: number;
  title: string;
  userId: number
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export type ListOfCategory = Category[];

export type CategoryDto = Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'user'>;