import React from "react";
import { View } from "react-native";
import { useTheme, Icon } from "react-native-paper";

import { StyleSheet } from "react-native";

interface Props {
  icon: string;
  size?: number;
  bgColor?: string;
}

export default function CircleIcon({ icon, size = 20, bgColor }: Props) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.circle,
        { backgroundColor: bgColor ?? theme.colors.elevation.level5 },
      ]}
    >
      <Icon color={theme.colors.secondary} source={icon} size={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    borderRadius: "50%",
  },
});
