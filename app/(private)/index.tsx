import { StyleSheet, View } from "react-native";
import BannerProfile from "@/components/BannerProfile";
import { Box } from "@/components/ui/Box";
import { Button, Text, useTheme, IconButton } from "react-native-paper";
import ButtonSheetParentWrapper from "@/components/bottomSheet/ButtonSheetParentWrapper";
import ButtonSheetCreateTransaction from "@/components/bottomSheet/modals/CreateTransaction";
import ButtonSheetPreviewTransactions from "@/components/bottomSheet/modals/PreviewTransactions";
import { useCallback, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useGetTransactionByDateRangeQuery } from "@/services/wsavingsAPI";
import dayjs from "dayjs";
import { useGroupedTransaction } from "@/hooks/useGroupedTransaction";
import { TransactionType } from "@/shared/models/Transaction";
import CircleIcon from "@/components/CircleIcon";
import { ButtonSheetSelectTransactionType } from "@/components/bottomSheet/modals/SelectTransactionType";
import { BarChart } from "@/components/BarChart";

type SelectedModal = "CREATE_TRANSACTION" | "SELECT_TRANSACTION_TYPE" | "PREVIEW_TRANSACTION" | "";

export default function HomeScreen() {
  const theme = useTheme();
  const [selectedModal, setSelectedModal] = useState<SelectedModal>('');

  const bottomSheetCreateTransactionRef = useRef<BottomSheetModal>(null);
  const bottomSheetSelectTransactionsTypeRef = useRef<BottomSheetModal>(null);
  const bottomSheetPreviewTransactionsRef = useRef<BottomSheetModal>(null);

  const [selectedTransactionType, setSelectedTransactionType] =
    useState<TransactionType>("INCOME");
  const [selectedTransaction, setSelectedTransactionId] = useState<
    number | null
  >(null);

  const { data, isLoading } = useGetTransactionByDateRangeQuery({
    startDate: dayjs().startOf("month").toISOString(),
    endDate: dayjs().endOf("month").toISOString(),
  });

  const { groupedByCategories } = useGroupedTransaction({
    transactionType: selectedTransactionType,
    transactions: data?.transactions ?? [],
  });

  const sumGroupedTransaction = groupedByCategories.reduce(
    (acc, curr) => acc + curr[1].amount,
    0
  );

  console.log("groups", groupedByCategories);

  const handleOpenCreateTransactionModal = useCallback(() => {
    setSelectedModal('CREATE_TRANSACTION');
    bottomSheetCreateTransactionRef.current?.present();
  }, []);

  const handleOpenPreviewTransactionsModal = useCallback(() => {
    setSelectedModal('PREVIEW_TRANSACTION');
    bottomSheetPreviewTransactionsRef.current?.present();
  }, []);

  const handleOpenSelectTransactionTypeModal = useCallback(() => {
    setSelectedModal('SELECT_TRANSACTION_TYPE');
    bottomSheetSelectTransactionsTypeRef.current?.present();
  }, []);

  return (
    <ButtonSheetParentWrapper>
      <Box style={styles.container}>
        <View style={styles.widgets}>
          <BannerProfile />

          <View style={styles.transactionAmountWidget}>
            <View style={styles.transactionAmountWidgetIcon}>
              {selectedTransactionType === "INCOME" ? (
                <CircleIcon icon="plus" bgColor={theme.colors.onSecondary} />
              ) : (
                <CircleIcon icon="minus" bgColor={theme.colors.error} />
              )}
            </View>
            <Text variant="displayMedium">{sumGroupedTransaction}k</Text>
            <IconButton
              icon="chevron-down"
              onPress={handleOpenSelectTransactionTypeModal}
            />
          </View>

          <View>
            <BarChart
              isLoading={isLoading}
              onClick={({ id}) => {
                setSelectedTransactionId(id);
                handleOpenPreviewTransactionsModal();
              }}
              data={groupedByCategories.map(([category, { amount, id }]) => ({
                id,
                label: category,
                value: amount,
              }))}
            />
          </View>

          <ButtonSheetSelectTransactionType
            componentRef={bottomSheetSelectTransactionsTypeRef}
            selectedTransactionType={selectedTransactionType}
            setSelectTransactionType={setSelectedTransactionType}
            onClose={() =>
              bottomSheetSelectTransactionsTypeRef.current?.dismiss()
            }
          />

          <ButtonSheetCreateTransaction
            isVisible={selectedModal === 'CREATE_TRANSACTION'}
            componentRef={bottomSheetCreateTransactionRef}
            onClose={() => bottomSheetCreateTransactionRef.current?.dismiss()}
          />

          <ButtonSheetPreviewTransactions
            categoryId={selectedTransaction}
            componentRef={bottomSheetPreviewTransactionsRef}
            onClose={() => {
              setSelectedTransactionId(null);
              bottomSheetPreviewTransactionsRef.current?.dismiss()
            }}
          />
        </View>

        <Box>
          <Button
            icon="plus"
            mode="outlined"
            disabled={isLoading}
            loading={isLoading}
            onPress={() => handleOpenCreateTransactionModal()}
          >
            Add Transaction
          </Button>
        </Box>
      </Box>
    </ButtonSheetParentWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  addTransactionWrapper: {
    // height: 112,
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  },
  widgets: {
    // flex: 1,
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "flex-start",
    // alignItems: "flex-end",
    // backgroundColor: "#fff",
  },
  transactionAmountWidget: {
    marginTop: 12,
    paddingTop: 6,
    paddingBottom: 6,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  transactionAmountWidgetIcon: {
    marginRight: 12,
    width: "auto",
    height: "auto",
  },
});
