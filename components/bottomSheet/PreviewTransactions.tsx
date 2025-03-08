import React, { useEffect } from "react";
import * as Yup from "yup";
import { Dimensions, StyleSheet, View } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useLazyGetTransactionByUserIdAndCategoryIdQuery } from "@/services/wsavingsAPI";
import { Category } from "@/shared/models/Category";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { CategoryDto } from "@/shared/models/Category";
import { Formik } from "formik";
import FormField from "@/components/FormField";
import { Button, List, Text, useTheme } from "react-native-paper";
import { Box } from "@/components/ui/Box";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

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
    <BottomSheetModal
      handleStyle={{
        backgroundColor: theme.colors.elevation.level1,
        borderTopRightRadius: 9,
        borderTopLeftRadius: 9,
      }}
      snapPoints={["45%", "80%"]}
      stackBehavior="push"
      ref={componentRef}
    >
      <BottomSheetView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Box>
          <Text variant="titleMedium">List of transaction for </Text>
          </Box>
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
      </BottomSheetView>
    </BottomSheetModal>
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
