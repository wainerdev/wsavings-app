import React, { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useLazyGetTransactionByUserIdAndCategoryIdQuery } from "@/services/wsavingsAPI";
import { List, Text, useTheme } from "react-native-paper";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { ButtonSheetModalWrapper } from "@/components/bottomSheet/ButtonSheetModalWrapper";

type Props = {
  categoryId: number | null;
  componentRef: React.RefObject<BottomSheetModal>;
  onClose?: () => void;
};

const SKELETON_ITEMS = Array.from({ length: 5 });

const ButtonSheetPreviewCategory = ({
  componentRef,
  onClose,
  categoryId,
}: Props) => {
  const theme = useTheme();

  const [fetchTransactions, { data, isLoading }] =
    useLazyGetTransactionByUserIdAndCategoryIdQuery();

  useEffect(() => {
    if (categoryId) {
      fetchTransactions({ categoryId });
    }
  }, [categoryId]);

  return (
    <ButtonSheetModalWrapper snapPoints={["45%", "80%"]} $ref={componentRef}>
      <Text variant="titleMedium">List of transaction for </Text>
      {isLoading ? (
        <MotiView
          style={styles.listWrapper}
          transition={{
            type: "timing",
          }}
        >
          {SKELETON_ITEMS.map((_, index) => (
            <Skeleton
              key={index}
              width={Dimensions.get("window").width - 64}
              height={32}
            />
          ))}
        </MotiView>
      ) : (
        <>
          {data?.transactions.map((transaction) => (
            <List.Item
              key={transaction.id}
              title={transaction.description}
              description={transaction.amount}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={transaction.type === "INCOME" ? "plus" : "minus"}
                />
              )}
            />
          ))}
        </>
      )}
    </ButtonSheetModalWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listWrapper: {
    marginLeft: 16,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
});

export default ButtonSheetPreviewCategory;
