import { StyleSheet } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type Props = {
  children: React.ReactNode;
};

export default function ButtonSheetWrapper({ children }: Props) {
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
