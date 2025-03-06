import { StyleSheet, View, type ViewProps } from "react-native";

export const BOX_PADDING = 16;

export type BoxProps = ViewProps & {};

export function Box({ style, ...otherProps }: BoxProps) {
  return <View style={[styles.container, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  container: {
    padding: BOX_PADDING,
  },
});
