import { Pressable, View, useWindowDimensions } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { Box } from "@/components/ui/Box";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type Bar = {
  id: number;
  label: string;
  value: number;
};

type SingleBarChartProps = {
  maxValue: number;
  maxHeight: number;
  width: number;
  bar: Bar;
  bgColor: string;
  onClick: (bar: Bar) => void;
  isLoading: boolean;
};

type BarChartProps = {
  data: Bar[];
  onClick: (bar: Bar) => void;
  isLoading: boolean;
};

const SKELETON_ITEMS = Array.from({ length: 5 }).map((_, index) => ({
  id: index,
  label: "loading",
  value: Math.floor(Math.random() * 250) + 1,
}));

console.log(SKELETON_ITEMS);

function SingleBarChart({
  maxValue, // max value of all bars
  maxHeight,
  width,
  bar,
  bgColor,
  onClick,
  isLoading
}: SingleBarChartProps) {
  const rStyle = useAnimatedStyle(() => {
    return {
      height: withTiming((bar.value / maxValue) * maxHeight),
      opacity: withTiming(bar.value / maxValue, { duration: 500 }),
    };
  }, [bar.value, maxHeight]);

  return (
    <Pressable onPress={() => onClick(bar)}>
      <Animated.View
        style={[
          {
            width: width,
            backgroundColor: bgColor,
            borderRadius: 15,
            borderCurve: "continuous",
          },
          rStyle,
        ]}
      />
      <Text
        variant="bodySmall"
        style={{
          width: width,
          marginTop: 12,
          textAlign: "center",
        }}
      >
        {bar.label}
        {"\n"}
        {isLoading ? "" : bar.value}
      </Text>
    </Pressable>
  );
}

export function BarChart({ data = [], onClick, isLoading = true }: BarChartProps) {
  console.log('data111', data)
  const theme = useTheme();
  const maxValue = Math.max(...data.map((bar) => bar.value));
  const { width: windowWidth } = useWindowDimensions();
  const BarChartWidth = windowWidth * 0.8;
  const BarChartGap = 10;
  const BarWidth = 60;
  const MaxBarHeight = 210;
  const ScrollViewHeight = 60;

  return (
    <Card style={{ marginTop: 16 }}>
      <Box>
        <Text variant="labelLarge">Overview</Text>
        <View
          style={{
            marginTop: 16,
            height: ScrollViewHeight + MaxBarHeight,
            width: windowWidth,
          }}
        >
          <View
            style={{
              //   height: MaxBarHeight,
              flexDirection: "row",
              gap: BarChartGap,
              alignItems: "flex-end",
              // marginHorizontal: (windowWidth - BarChartWidth) / 2,
            }}
          >
            {isLoading ? (
              <>
                {SKELETON_ITEMS.map((bar, index) => (
                  <SingleBarChart 
                    isLoading={isLoading}
                    bgColor={theme.colors.secondary}
                    maxValue={Math.max(...SKELETON_ITEMS.map((bar) => bar.value))}
                    key={index}
                    maxHeight={MaxBarHeight}
                    width={BarWidth}
                    bar={bar}
                    onClick={() => {}}
                  />
                ))}
              </>
            ) : (
              <>
                {data.map((bar, index) => (
                  <SingleBarChart
                    isLoading={isLoading}
                    bgColor={theme.colors.secondary}
                    maxValue={maxValue}
                    key={index}
                    maxHeight={MaxBarHeight}
                    width={BarWidth}
                    bar={bar}
                    onClick={onClick}
                  />
                ))}
              </>
            )}
          </View>
        </View>
      </Box>
    </Card>
  );
}
