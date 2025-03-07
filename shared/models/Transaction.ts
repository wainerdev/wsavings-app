import { User } from '@/shared/models/User';
import { Category } from '@/shared/models/Category';

export type TransactionType = "INCOME" | "EXPENSE";

export interface Transaction {
  id: number;
  amount: number;
  description: string;
  userId: number
  categoryId: number;
  type: TransactionType,
  user: User;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}

export type ListOfTransaction = {
  transactions: Transaction[];
}

export type TransactionDto = Omit<Transaction, 'id' | 'createdAt' | 'updatedAt' | 'user' | 'category'>;
