import { Dimensions, StyleSheet, View } from "react-native";
import BannerProfile from "@/components/BannerProfile";
import { Box, BOX_PADDING } from "@/components/ui/Box";
import { Button } from "react-native-paper";
import ButtonSheetWrapper from "@/components/bottomSheet/Wrapper";
import ButtonSheetCreateTransaction from "@/components/bottomSheet/CreateTransaction";
import { useCallback, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Text } from "react-native-paper";
import { useGetTransactionByDateRangeQuery } from "@/services/wsavingsAPI";
import dayjs from "dayjs";
import { BarChart } from "react-native-chart-kit";
import { useGroupedTransaction } from "@/hooks/useGroupedTransaction";

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  decimalPlaces: 1, // To round off to 2 decimal
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`, // Color of the line and labels
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Color of labels
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

export default function HomeScreen() {
  const bottomSheetCreateTransactionRef = useRef<BottomSheetModal>(null);
  const { data, isLoading } = useGetTransactionByDateRangeQuery({
    startDate: dayjs().startOf("month").toISOString(),
    endDate: dayjs().endOf("month").toISOString(),
  });

  const { groupedByCategories } = useGroupedTransaction(
    data?.transactions ?? []
  );

  console.log('groups', groupedByCategories)

  const handleOpenCategoryTransactionModal = useCallback(() => {
    bottomSheetCreateTransactionRef.current?.present();
  }, []);

  return (
    <ButtonSheetWrapper>
      <Box style={styles.container}>
        <BannerProfile />

        <ButtonSheetCreateTransaction
          componentRef={bottomSheetCreateTransactionRef}
          onClose={() => bottomSheetCreateTransactionRef.current?.dismiss()}
        />

        <View>
          <BarChart
            chartConfig={{...chartConfig}}
            style={{borderRadius: 16 }}
            height={Dimensions.get("window").height / 3}
            yAxisSuffix="k"
            yAxisLabel=""
            fromZero={true}
            showBarTops
            showValuesOnTopOfBars
            width={Dimensions.get("window").width - BOX_PADDING * 2}
            data={{
              labels: groupedByCategories.map(([key]) => key),
              datasets: [
                {
                  data: groupedByCategories.map(([_, value]) => value.amount),
                },
              ],
            }}
          />
        </View>

        <View style={styles.addTransactionWrapper}>
          <Button
            icon="plus"
            mode="outlined"
            disabled={isLoading}
            loading={isLoading}
            onPress={() => handleOpenCategoryTransactionModal()}
          >
            Add Transaction
          </Button>
        </View>
      </Box>
    </ButtonSheetWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addTransactionWrapper: {
    height: 112,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
