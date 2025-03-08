import { Transaction, TransactionType } from "@/shared/models/Transaction";
import { useMemo } from "react";

interface Props {
  transactionType: TransactionType;
  transactions: Transaction[];
}

export function useGroupedTransaction({ transactionType, transactions }: Props) {
  const groupedByCategory = () => {
    const groups = transactions.reduce(
      (acc, curr) => {
        const { type, amount } = curr;
        const category = curr.category?.title || "unknown";
        if (acc[category]) {
          if(transactionType === type) {
            acc[category].amount += amount;
            acc[category]['id']= curr.category?.id as number;
            acc[category].transactions.push(curr);
          }
        } else {
          if (transactionType === type) {
            acc[category] = {
              id: curr.category?.id as number,
              amount: amount,
              transactions: [curr],
            };
          }
        }
        return acc;
      },
      {} as Record<
        string,
        {
          id: number;
          amount: number;
          transactions: Transaction[];
        }
      >
    );

    return Object.entries(groups || {}).sort(
      (a, b) => b[1].amount - a[1].amount
    );
  };

  return {
    groupedByCategories: useMemo(groupedByCategory, [transactions, transactionType]),
  };
}
