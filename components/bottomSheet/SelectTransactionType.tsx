import React from "react";
import { StyleSheet } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { TransactionType } from "@/shared/models/Transaction";
import { SegmentedButtons } from "react-native-paper";
import { useTheme } from "react-native-paper";

type Props = {
  selectedTransactionType: TransactionType;
  setSelectTransactionType: React.Dispatch<React.SetStateAction<TransactionType>>;
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
    <BottomSheetModal
      handleStyle={{
        backgroundColor: theme.colors.elevation.level1,
        borderTopRightRadius: 9,
        borderTopLeftRadius: 9,
      }}
      snapPoints={["25%", "80%"]}
      stackBehavior="push"
      ref={componentRef}
    >
      <BottomSheetView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <SegmentedButtons
          value={selectedTransactionType}
          onValueChange={(value) => setSelectTransactionType(value as TransactionType)}
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
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
