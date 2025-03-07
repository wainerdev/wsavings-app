import { Transaction } from "@/shared/models/Transaction";
import { useMemo } from "react";

export function useGroupedTransaction(transactions: Transaction[]) {
  const groupedByCategory = () => {
    const groups = transactions.reduce(
      (acc, curr) => {
        const category = curr.category?.title || "unknown";
        const { type, amount } = curr;
        if (acc[category]) {
          if(type === "INCOME") {
            acc[category].amount += amount;
          }
          if (type === "EXPENSE") {
            acc[category].amount -= amount;
          }
          acc[category].transactions.push(curr);
        } else {
          acc[category] = {
            amount: type === "INCOME" ? amount : -amount,
            transactions: [curr],
          };
        }
        return acc;
      },
      {} as Record<
        string,
        {
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
    groupedByCategories: useMemo(groupedByCategory, [transactions]),
  };
}
