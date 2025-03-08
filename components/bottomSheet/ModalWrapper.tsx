import React from "react";
import { StyleSheet } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

import { useTheme } from "react-native-paper";
import { Box } from "@/components/ui/Box";

type Props = {
  categoryId: number | null;
  componentRef: React.RefObject<BottomSheetModal>;
  onClose?: () => void;
  children: React.ReactNode;
};

const ModalWrapper = ({ componentRef, children }: Props) => {
  const theme = useTheme();

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
        <Box>{children}</Box>
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

export default ModalWrapper;
