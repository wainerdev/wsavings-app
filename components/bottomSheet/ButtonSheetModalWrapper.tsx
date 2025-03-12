import React from "react";
import { StyleSheet } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

import { useTheme } from "react-native-paper";
import { Box } from "@/components/ui/Box";

type Props = {
  $ref: React.RefObject<BottomSheetModal>;
  children: React.ReactNode;
  snapPoints?: string[];
};

export function ButtonSheetModalWrapper({
  $ref,
  children,
  snapPoints = ["30%", "100%"],
}: Props) {
  const theme = useTheme();

  return (
    <BottomSheetModal
      handleStyle={{
        backgroundColor: theme.colors.elevation.level1,
        borderTopRightRadius: 9,
        borderTopLeftRadius: 9,
      }}
      snapPoints={snapPoints}
      stackBehavior="switch"
      ref={$ref}
    >
      <BottomSheetView
        style={[styles.sheetView, { backgroundColor: theme.colors.background }]}
      >
        <Box style={styles.box}>{children}</Box>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  sheetView: {
    height: "100%",
  },
  box: {
    flex: 1,
  },
});
