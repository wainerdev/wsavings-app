import React from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { TransactionType } from "@/shared/models/Transaction";
import { SegmentedButtons } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { ButtonSheetModalWrapper } from "@/components/bottomSheet/ButtonSheetModalWrapper";

type Props = {
  selectedTransactionType: TransactionType;
  setSelectTransactionType: React.Dispatch<
    React.SetStateAction<TransactionType>
  >;
  componentRef: React.RefObject<BottomSheetModal>;
  onClose?: () => void;
};

export function ButtonSheetSelectTransactionType({
  selectedTransactionType,
  setSelectTransactionType,
  componentRef,
  onClose,
}: Props) {
  const theme = useTheme();
  return (
    <ButtonSheetModalWrapper snapPoints={["25%", "30%"]} $ref={componentRef}>
      <SegmentedButtons
        value={selectedTransactionType}
        onValueChange={(value) =>
          setSelectTransactionType(value as TransactionType)
        }
        buttons={[
          {
            value: "INCOME" as TransactionType,
            label: "Income",
          },
          {
            value: "EXPENSE",
            label: "Expense",
          },
        ]}
      />
    </ButtonSheetModalWrapper>
  );
}
